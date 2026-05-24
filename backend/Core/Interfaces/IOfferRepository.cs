using SmartOffer.Core.Entities;

namespace SmartOffer.Core.Interfaces;

public interface IOfferRepository
{
    Task<Offer?> GetByIdAsync(int id);
    Task<List<Offer>> GetAllAsync();
    Task<List<Offer>> GetActiveOffersAsync();
    Task<Offer> CreateAsync(Offer offer);
    Task<Offer> UpdateAsync(Offer offer);
    Task DeleteAsync(int id);
}
