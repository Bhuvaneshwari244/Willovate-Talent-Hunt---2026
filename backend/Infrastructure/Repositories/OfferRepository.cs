using Microsoft.EntityFrameworkCore;
using SmartOffer.Core.Entities;
using SmartOffer.Core.Interfaces;
using SmartOffer.Infrastructure.Data;

namespace SmartOffer.Infrastructure.Repositories;

public class OfferRepository : IOfferRepository
{
    private readonly ApplicationDbContext _context;

    public OfferRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Offer?> GetByIdAsync(int id)
    {
        return await _context.Offers
            .Include(o => o.Business)
            .Include(o => o.Slots)
            .FirstOrDefaultAsync(o => o.Id == id);
    }

    public async Task<List<Offer>> GetAllAsync()
    {
        return await _context.Offers
            .Include(o => o.Business)
            .Include(o => o.Slots)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();
    }

    public async Task<List<Offer>> GetActiveOffersAsync()
    {
        return await _context.Offers
            .Include(o => o.Business)
            .Include(o => o.Slots)
            .Where(o => o.Status == "Active" && o.EndDate >= DateTime.UtcNow)
            .OrderBy(o => o.EndDate)
            .ToListAsync();
    }

    public async Task<Offer> CreateAsync(Offer offer)
    {
        _context.Offers.Add(offer);
        await _context.SaveChangesAsync();
        return await GetByIdAsync(offer.Id) ?? offer;
    }

    public async Task<Offer> UpdateAsync(Offer offer)
    {
        _context.Offers.Update(offer);
        await _context.SaveChangesAsync();
        return await GetByIdAsync(offer.Id) ?? offer;
    }

    public async Task DeleteAsync(int id)
    {
        var offer = await _context.Offers.FindAsync(id);
        if (offer != null)
        {
            _context.Offers.Remove(offer);
            await _context.SaveChangesAsync();
        }
    }
}
