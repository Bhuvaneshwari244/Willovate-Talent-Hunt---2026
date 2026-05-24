using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartOffer.Core.DTOs;
using SmartOffer.Infrastructure.Data;

namespace SmartOffer.API.Controllers;

[ApiController]
[Route("api/notifications")]
[Authorize]
public class NotificationsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public NotificationsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<NotificationLogResponse>>> GetAll()
    {
        var logs = await _context.NotificationLogs
            .Include(n => n.Booking)
            .OrderByDescending(n => n.SentAt)
            .ToListAsync();

        var result = logs.Select(n => new NotificationLogResponse(
            n.Id,
            n.BookingId,
            n.Booking.BookingReference,
            n.Booking.CustomerName,
            n.Channel,
            n.Recipient,
            n.Subject,
            n.Body,
            n.Status,
            n.SentAt
        )).ToList();

        return Ok(result);
    }

    [HttpGet("booking/{bookingId}")]
    [AllowAnonymous]
    public async Task<ActionResult<List<NotificationLogResponse>>> GetByBooking(int bookingId)
    {
        var logs = await _context.NotificationLogs
            .Include(n => n.Booking)
            .Where(n => n.BookingId == bookingId)
            .OrderByDescending(n => n.SentAt)
            .ToListAsync();

        var result = logs.Select(n => new NotificationLogResponse(
            n.Id,
            n.BookingId,
            n.Booking.BookingReference,
            n.Booking.CustomerName,
            n.Channel,
            n.Recipient,
            n.Subject,
            n.Body,
            n.Status,
            n.SentAt
        )).ToList();

        return Ok(result);
    }
}
