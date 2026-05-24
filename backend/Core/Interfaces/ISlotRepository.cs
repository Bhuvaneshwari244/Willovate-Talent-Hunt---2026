using SmartOffer.Core.Entities;

namespace SmartOffer.Core.Interfaces;

public interface ISlotRepository
{
    Task<OfferSlot?> GetByIdAsync(int id);
    Task<List<OfferSlot>> GetByOfferIdAsync(int offerId);
    Task<OfferSlot> CreateAsync(OfferSlot slot);
    Task<OfferSlot> UpdateAsync(OfferSlot slot);
    Task DeleteAsync(int id);
}
