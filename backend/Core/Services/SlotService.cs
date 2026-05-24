using SmartOffer.Core.DTOs;
using SmartOffer.Core.Entities;
using SmartOffer.Core.Interfaces;

namespace SmartOffer.Core.Services;

public class SlotService : ISlotService
{
    private readonly ISlotRepository _repository;

    public SlotService(ISlotRepository repository)
    {
        _repository = repository;
    }

    public async Task<SlotResponse?> GetByIdAsync(int id)
    {
        var slot = await _repository.GetByIdAsync(id);
        return slot == null ? null : MapToResponse(slot);
    }

    public async Task<List<SlotResponse>> GetByOfferIdAsync(int offerId)
    {
        var slots = await _repository.GetByOfferIdAsync(offerId);
        return slots.Select(MapToResponse).ToList();
    }

    public async Task<SlotResponse> CreateAsync(SlotRequest request)
    {
        var slot = new OfferSlot
        {
            OfferId = request.OfferId,
            SlotDate = request.SlotDate,
            StartTime = request.StartTime,
            EndTime = request.EndTime,
            Capacity = request.Capacity,
            BookedCount = 0,
            Status = "Available"
        };

        var created = await _repository.CreateAsync(slot);
        return MapToResponse(created);
    }

    public async Task<SlotResponse> UpdateAsync(int id, SlotRequest request)
    {
        var slot = await _repository.GetByIdAsync(id) 
            ?? throw new KeyNotFoundException($"Slot with ID {id} not found");

        slot.SlotDate = request.SlotDate;
        slot.StartTime = request.StartTime;
        slot.EndTime = request.EndTime;
        slot.Capacity = request.Capacity;

        var updated = await _repository.UpdateAsync(slot);
        return MapToResponse(updated);
    }

    public async Task DeleteAsync(int id)
    {
        await _repository.DeleteAsync(id);
    }

    private static SlotResponse MapToResponse(OfferSlot slot) => new(
        slot.Id,
        slot.OfferId,
        slot.SlotDate,
        slot.StartTime,
        slot.EndTime,
        slot.Capacity,
        slot.BookedCount,
        slot.AvailableCount,
        slot.Status,
        slot.CreatedAt
    );
}
