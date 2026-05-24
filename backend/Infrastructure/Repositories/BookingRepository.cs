using Microsoft.EntityFrameworkCore;
using SmartOffer.Core.Entities;
using SmartOffer.Core.Interfaces;
using SmartOffer.Infrastructure.Data;

namespace SmartOffer.Infrastructure.Repositories;

public class BookingRepository : IBookingRepository
{
    private readonly ApplicationDbContext _context;

    public BookingRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Booking?> GetByIdAsync(int id)
    {
        return await _context.Bookings
            .Include(b => b.Offer)
                .ThenInclude(o => o.Business)
            .Include(b => b.Slot)
            .FirstOrDefaultAsync(b => b.Id == id);
    }

    public async Task<List<Booking>> GetAllAsync()
    {
        return await _context.Bookings
            .Include(b => b.Offer)
                .ThenInclude(o => o.Business)
            .Include(b => b.Slot)
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync();
    }

    public async Task<Booking> CreateAsync(Booking booking)
    {
        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();
        return await GetByIdAsync(booking.Id) ?? booking;
    }

    public async Task<Booking> UpdateAsync(Booking booking)
    {
        _context.Bookings.Update(booking);
        await _context.SaveChangesAsync();
        return await GetByIdAsync(booking.Id) ?? booking;
    }

    public async Task<int> CountByPhoneAndOfferAsync(string phone, int offerId)
    {
        return await _context.Bookings
            .CountAsync(b => b.CustomerPhone == phone && b.OfferId == offerId);
    }

    public async Task<List<Booking>> LookupAsync(string type, string query)
    {
        IQueryable<Booking> q = _context.Bookings
            .Include(b => b.Offer)
                .ThenInclude(o => o.Business)
            .Include(b => b.Slot);

        if (type == "reference")
            q = q.Where(b => b.BookingReference == query);
        else
            q = q.Where(b => b.CustomerPhone == query);

        return await q.OrderByDescending(b => b.CreatedAt).ToListAsync();
    }
}
