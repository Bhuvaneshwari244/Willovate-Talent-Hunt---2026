using QRCoder;
using SmartOffer.Core.DTOs;
using SmartOffer.Core.Entities;
using SmartOffer.Core.Interfaces;

namespace SmartOffer.Core.Services;

public class BookingService : IBookingService
{
    private readonly IBookingRepository _bookingRepository;
    private readonly ISlotRepository _slotRepository;
    private readonly IOfferRepository _offerRepository;
    private readonly INotificationService _notificationService;

    public BookingService(
        IBookingRepository bookingRepository,
        ISlotRepository slotRepository,
        IOfferRepository offerRepository,
        INotificationService notificationService)
    {
        _bookingRepository = bookingRepository;
        _slotRepository = slotRepository;
        _offerRepository = offerRepository;
        _notificationService = notificationService;
    }

    public async Task<BookingResponse?> GetByIdAsync(int id)
    {
        var booking = await _bookingRepository.GetByIdAsync(id);
        return booking == null ? null : MapToResponse(booking);
    }

    public async Task<List<BookingResponse>> GetAllAsync()
    {
        var bookings = await _bookingRepository.GetAllAsync();
        return bookings.Select(MapToResponse).ToList();
    }

    public async Task<BookingResponse> CreateAsync(BookingRequest request)
    {
        var slot = await _slotRepository.GetByIdAsync(request.SlotId) 
            ?? throw new KeyNotFoundException("Slot not found");
        
        var offer = await _offerRepository.GetByIdAsync(request.OfferId) 
            ?? throw new KeyNotFoundException("Offer not found");

        // Validations
        if (offer.Status != "Active")
            throw new InvalidOperationException("Offer is not active");

        if (offer.EndDate < DateTime.UtcNow)
            throw new InvalidOperationException("Offer has expired");

        if (slot.Status != "Available")
            throw new InvalidOperationException("Slot is not available");

        if (slot.IsFull)
            throw new InvalidOperationException("Slot is full");

        if (request.PeopleCount > slot.AvailableCount)
            throw new InvalidOperationException("Not enough capacity available");

        var existingBookings = await _bookingRepository.CountByPhoneAndOfferAsync(request.CustomerPhone, request.OfferId);
        if (existingBookings >= offer.MaxBookingPerCustomer)
            throw new InvalidOperationException($"Booking limit exceeded. Maximum {offer.MaxBookingPerCustomer} booking(s) per customer");

        var bookingReference = GenerateBookingReference();
        var qrCode = GenerateQRCode(bookingReference);

        var booking = new Booking
        {
            BookingReference = bookingReference,
            OfferId = request.OfferId,
            SlotId = request.SlotId,
            CustomerName = request.CustomerName,
            CustomerPhone = request.CustomerPhone,
            CustomerEmail = request.CustomerEmail,
            PeopleCount = request.PeopleCount,
            SpecialNote = request.SpecialNote,
            Status = "Pending",
            QRCode = qrCode
        };

        slot.BookedCount += request.PeopleCount;
        if (slot.BookedCount >= slot.Capacity)
            slot.Status = "Full";

        await _slotRepository.UpdateAsync(slot);
        var created = await _bookingRepository.CreateAsync(booking);

        // Send mock email + SMS confirmation
        await _notificationService.SendBookingConfirmationAsync(created);

        return MapToResponse(created);
    }

    public async Task<BookingResponse> UpdateStatusAsync(int id, string status)
    {
        var booking = await _bookingRepository.GetByIdAsync(id) 
            ?? throw new KeyNotFoundException("Booking not found");

        booking.Status = status;
        var updated = await _bookingRepository.UpdateAsync(booking);
        return MapToResponse(updated);
    }

    public async Task<List<BookingResponse>> LookupAsync(string type, string query)
    {
        var bookings = await _bookingRepository.LookupAsync(type, query);
        return bookings.Select(MapToResponse).ToList();
    }

    private static string GenerateBookingReference()
    {
        return $"BK{DateTime.UtcNow:yyyyMMddHHmmss}{Random.Shared.Next(1000, 9999)}";
    }

    private static string GenerateQRCode(string text)
    {
        using var qrGenerator = new QRCodeGenerator();
        using var qrCodeData = qrGenerator.CreateQrCode(text, QRCodeGenerator.ECCLevel.Q);
        using var qrCode = new PngByteQRCode(qrCodeData);
        var qrCodeImage = qrCode.GetGraphic(20);
        return Convert.ToBase64String(qrCodeImage);
    }

    private static BookingResponse MapToResponse(Booking booking) => new(
        booking.Id,
        booking.BookingReference,
        booking.OfferId,
        booking.Offer?.Title ?? "",
        booking.Offer?.Business?.Name ?? "",
        booking.SlotId,
        booking.Slot?.SlotDate ?? DateTime.MinValue,
        booking.Slot?.StartTime ?? TimeSpan.Zero,
        booking.Slot?.EndTime ?? TimeSpan.Zero,
        booking.CustomerName,
        booking.CustomerPhone,
        booking.CustomerEmail,
        booking.PeopleCount,
        booking.SpecialNote,
        booking.Status,
        booking.QRCode,
        booking.CreatedAt
    );
}
