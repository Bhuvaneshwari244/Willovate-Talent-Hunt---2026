using Microsoft.EntityFrameworkCore;
using SmartOffer.Core.DTOs;
using SmartOffer.Core.Interfaces;
using SmartOffer.Infrastructure.Data;

namespace SmartOffer.API.Services;

public class DashboardService : IDashboardService
{
    private readonly ApplicationDbContext _context;

    public DashboardService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardSummary> GetSummaryAsync()
    {
        var today = DateTime.UtcNow.Date;

        var totalOffers = await _context.Offers.CountAsync();
        var activeOffers = await _context.Offers.CountAsync(o => o.Status == "Active");
        var totalBookings = await _context.Bookings.CountAsync();
        var todayBookings = await _context.Bookings.CountAsync(b => b.CreatedAt.Date == today);

        var totalCapacity = await _context.OfferSlots.SumAsync(s => s.Capacity);
        var bookedSeats = await _context.OfferSlots.SumAsync(s => s.BookedCount);
        var availableSeats = totalCapacity - bookedSeats;

        var conversionRate = totalCapacity > 0 ? (decimal)bookedSeats / totalCapacity * 100 : 0;

        var recentBookings = await _context.Bookings
            .Include(b => b.Offer)
            .Include(b => b.Slot)
            .OrderByDescending(b => b.CreatedAt)
            .Take(10)
            .ToListAsync();

        var recentBookingDtos = recentBookings.Select(b => new RecentBooking(
            b.Id,
            b.CustomerName,
            b.Offer.Title,
            b.Slot.SlotDate,
            b.Slot.StartTime,
            b.PeopleCount,
            b.Status
        )).ToList();

        return new DashboardSummary(
            totalOffers,
            activeOffers,
            totalBookings,
            todayBookings,
            totalCapacity,
            bookedSeats,
            availableSeats,
            Math.Round(conversionRate, 2),
            recentBookingDtos
        );
    }
}
