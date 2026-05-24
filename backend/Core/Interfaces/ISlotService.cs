using SmartOffer.Core.DTOs;

namespace SmartOffer.Core.Interfaces;

public interface ISlotService
{
    Task<SlotResponse?> GetByIdAsync(int id);
    Task<List<SlotResponse>> GetByOfferIdAsync(int offerId);
    Task<SlotResponse> CreateAsync(SlotRequest request);
    Task<SlotResponse> UpdateAsync(int id, SlotRequest request);
    Task DeleteAsync(int id);
}
