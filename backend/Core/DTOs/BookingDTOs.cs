namespace SmartOffer.Core.DTOs;

public record BookingRequest(
    int OfferId,
    int SlotId,
    string CustomerName,
    string CustomerPhone,
    string? CustomerEmail,
    int PeopleCount,
    string? SpecialNote
);

public record BookingResponse(
    int Id,
    string BookingReference,
    int OfferId,
    string OfferTitle,
    string BusinessName,
    int SlotId,
    DateTime SlotDate,
    TimeSpan StartTime,
    TimeSpan EndTime,
    string CustomerName,
    string CustomerPhone,
    string? CustomerEmail,
    int PeopleCount,
    string? SpecialNote,
    string Status,
    string? QRCode,
    DateTime CreatedAt
);

public record BookingStatusUpdate(string Status);

public record DashboardSummary(
    int TotalOffers,
    int ActiveOffers,
    int TotalBookings,
    int TodayBookings,
    int TotalCapacity,
    int BookedSeats,
    int AvailableSeats,
    decimal ConversionRate,
    List<RecentBooking> RecentBookings
);

public record RecentBooking(
    int Id,
    string CustomerName,
    string OfferName,
    DateTime SlotDate,
    TimeSpan SlotTime,
    int PeopleCount,
    string Status
);
