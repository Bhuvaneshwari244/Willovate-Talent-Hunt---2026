using Microsoft.EntityFrameworkCore;
using SmartOffer.Core.Entities;
using SmartOffer.Core.Interfaces;
using SmartOffer.Infrastructure.Data;

namespace SmartOffer.Infrastructure.Repositories;

public class SlotRepository : ISlotRepository
{
    private readonly ApplicationDbContext _context;

    public SlotRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<OfferSlot?> GetByIdAsync(int id)
    {
        return await _context.OfferSlots
            .Include(s => s.Offer)
            .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<List<OfferSlot>> GetByOfferIdAsync(int offerId)
    {
        var slots = await _context.OfferSlots
            .Where(s => s.OfferId == offerId)
            .ToListAsync();
        
        return slots
            .OrderBy(s => s.SlotDate)
            .ThenBy(s => s.StartTime)
            .ToList();
    }

    public async Task<OfferSlot> CreateAsync(OfferSlot slot)
    {
        _context.OfferSlots.Add(slot);
        await _context.SaveChangesAsync();
        return slot;
    }

    public async Task<OfferSlot> UpdateAsync(OfferSlot slot)
    {
        _context.OfferSlots.Update(slot);
        await _context.SaveChangesAsync();
        return slot;
    }

    public async Task DeleteAsync(int id)
    {
        var slot = await _context.OfferSlots.FindAsync(id);
        if (slot != null)
        {
            _context.OfferSlots.Remove(slot);
            await _context.SaveChangesAsync();
        }
    }
}
