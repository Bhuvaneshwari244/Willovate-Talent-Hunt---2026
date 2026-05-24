using SmartOffer.Core.DTOs;
using SmartOffer.Core.Entities;
using SmartOffer.Core.Interfaces;

namespace SmartOffer.Core.Services;

public class OfferService : IOfferService
{
    private readonly IOfferRepository _repository;

    public OfferService(IOfferRepository repository)
    {
        _repository = repository;
    }

    public async Task<OfferResponse?> GetByIdAsync(int id)
    {
        var offer = await _repository.GetByIdAsync(id);
        return offer == null ? null : MapToResponse(offer);
    }

    public async Task<List<OfferListItem>> GetAllAsync()
    {
        var offers = await _repository.GetAllAsync();
        return offers.Select(MapToListItem).ToList();
    }

    public async Task<List<OfferListItem>> GetActiveOffersAsync()
    {
        var offers = await _repository.GetActiveOffersAsync();
        return offers.Select(MapToListItem).ToList();
    }

    public async Task<OfferResponse> CreateAsync(OfferRequest request)
    {
        if (request.OfferPrice >= request.OriginalPrice)
            throw new InvalidOperationException("Offer price must be less than original price");

        var discountPercentage = ((request.OriginalPrice - request.OfferPrice) / request.OriginalPrice) * 100;

        var offer = new Offer
        {
            BusinessId = request.BusinessId,
            Title = request.Title,
            Description = request.Description,
            Category = request.Category,
            OriginalPrice = request.OriginalPrice,
            OfferPrice = request.OfferPrice,
            DiscountPercentage = discountPercentage,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            MaxBookingPerCustomer = request.MaxBookingPerCustomer,
            TermsAndConditions = request.TermsAndConditions,
            Status = request.Status
        };

        var created = await _repository.CreateAsync(offer);
        return MapToResponse(created);
    }

    public async Task<OfferResponse> UpdateAsync(int id, OfferRequest request)
    {
        var offer = await _repository.GetByIdAsync(id) 
            ?? throw new KeyNotFoundException($"Offer with ID {id} not found");

        if (request.OfferPrice >= request.OriginalPrice)
            throw new InvalidOperationException("Offer price must be less than original price");

        var discountPercentage = ((request.OriginalPrice - request.OfferPrice) / request.OriginalPrice) * 100;

        offer.BusinessId = request.BusinessId;
        offer.Title = request.Title;
        offer.Description = request.Description;
        offer.Category = request.Category;
        offer.OriginalPrice = request.OriginalPrice;
        offer.OfferPrice = request.OfferPrice;
        offer.DiscountPercentage = discountPercentage;
        offer.StartDate = request.StartDate;
        offer.EndDate = request.EndDate;
        offer.MaxBookingPerCustomer = request.MaxBookingPerCustomer;
        offer.TermsAndConditions = request.TermsAndConditions;
        offer.Status = request.Status;
        offer.UpdatedAt = DateTime.UtcNow;

        var updated = await _repository.UpdateAsync(offer);
        return MapToResponse(updated);
    }

    public async Task DeleteAsync(int id)
    {
        await _repository.DeleteAsync(id);
    }

    private static OfferResponse MapToResponse(Offer offer) => new(
        offer.Id,
        offer.BusinessId,
        offer.Business?.Name ?? "",
        offer.Title,
        offer.Description,
        offer.Category,
        offer.OriginalPrice,
        offer.OfferPrice,
        offer.DiscountPercentage,
        offer.StartDate,
        offer.EndDate,
        offer.MaxBookingPerCustomer,
        offer.TermsAndConditions,
        offer.Status,
        offer.Slots.Count,
        offer.Slots.Sum(s => s.AvailableCount),
        offer.CreatedAt
    );

    private static OfferListItem MapToListItem(Offer offer) => new(
        offer.Id,
        offer.Title,
        offer.Business?.Name ?? "",
        offer.Category,
        offer.OriginalPrice,
        offer.OfferPrice,
        offer.DiscountPercentage,
        offer.Slots.Sum(s => s.AvailableCount),
        offer.EndDate,
        offer.Status
    );
}
