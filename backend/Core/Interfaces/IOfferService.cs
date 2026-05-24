using SmartOffer.Core.DTOs;

namespace SmartOffer.Core.Interfaces;

public interface IOfferService
{
    Task<OfferResponse?> GetByIdAsync(int id);
    Task<List<OfferListItem>> GetAllAsync();
    Task<List<OfferListItem>> GetActiveOffersAsync();
    Task<OfferResponse> CreateAsync(OfferRequest request);
    Task<OfferResponse> UpdateAsync(int id, OfferRequest request);
    Task DeleteAsync(int id);
}
