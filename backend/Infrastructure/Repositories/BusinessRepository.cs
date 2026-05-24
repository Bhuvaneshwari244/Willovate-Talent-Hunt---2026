using Microsoft.EntityFrameworkCore;
using SmartOffer.Core.Entities;
using SmartOffer.Core.Interfaces;
using SmartOffer.Infrastructure.Data;

namespace SmartOffer.Infrastructure.Repositories;

public class BusinessRepository : IBusinessRepository
{
    private readonly ApplicationDbContext _context;

    public BusinessRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Business?> GetByIdAsync(int id)
    {
        return await _context.Businesses.FindAsync(id);
    }

    public async Task<List<Business>> GetAllAsync()
    {
        return await _context.Businesses
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync();
    }

    public async Task<Business> CreateAsync(Business business)
    {
        _context.Businesses.Add(business);
        await _context.SaveChangesAsync();
        return business;
    }

    public async Task<Business> UpdateAsync(Business business)
    {
        _context.Businesses.Update(business);
        await _context.SaveChangesAsync();
        return business;
    }

    public async Task DeleteAsync(int id)
    {
        var business = await _context.Businesses.FindAsync(id);
        if (business != null)
        {
            _context.Businesses.Remove(business);
            await _context.SaveChangesAsync();
        }
    }
}
