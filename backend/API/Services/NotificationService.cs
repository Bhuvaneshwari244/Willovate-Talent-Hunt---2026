using SmartOffer.Core.Entities;
using SmartOffer.Core.Interfaces;
using SmartOffer.Infrastructure.Data;

namespace SmartOffer.API.Services;

/// <summary>
/// Mock notification service — logs email/SMS to the database instead of sending real messages.
/// In production, replace with SendGrid / Twilio / AWS SES.
/// </summary>
public class NotificationService : INotificationService
{
    private readonly ApplicationDbContext _context;

    public NotificationService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task SendBookingConfirmationAsync(Booking booking)
    {
        var offerTitle  = booking.Offer?.Title ?? "Offer";
        var businessName = booking.Offer?.Business?.Name ?? "Business";
        var slotDate    = booking.Slot?.SlotDate.ToString("dd MMM yyyy") ?? "";
        var startTime   = booking.Slot?.StartTime.ToString(@"hh\:mm") ?? "";
        var endTime     = booking.Slot?.EndTime.ToString(@"hh\:mm") ?? "";
        const string siteUrl = "http://localhost:5173";

        // ── Mock Email ──────────────────────────────────────────────────────
        if (!string.IsNullOrWhiteSpace(booking.CustomerEmail))
        {
            var emailBody = $@"Hi {booking.CustomerName},

Your booking is confirmed! 🎉

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  BOOKING CONFIRMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Reference : {booking.BookingReference}
  Offer     : {offerTitle}
  Business  : {businessName}
  Date      : {slotDate}
  Time      : {startTime} – {endTime}
  People    : {booking.PeopleCount}
  Status    : {booking.Status}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To view your booking anytime, visit:
{siteUrl}/my-bookings

Search by your phone number or booking reference: {booking.BookingReference}

Show the QR code at the venue for entry.

Thank you for booking with {businessName}!
— Smart Offer Team";

            _context.NotificationLogs.Add(new NotificationLog
            {
                BookingId = booking.Id,
                Channel   = "Email",
                Recipient = booking.CustomerEmail,
                Subject   = $"Booking Confirmed – {offerTitle} [{booking.BookingReference}]",
                Body      = emailBody,
                Status    = "Sent",
                SentAt    = DateTime.UtcNow
            });
        }

        // ── Mock SMS ────────────────────────────────────────────────────────
        var smsBody = $"SmartOffer: Booking confirmed! Ref: {booking.BookingReference} | {offerTitle} on {slotDate} {startTime}. View bookings: {siteUrl}/my-bookings";

        _context.NotificationLogs.Add(new NotificationLog
        {
            BookingId = booking.Id,
            Channel   = "SMS",
            Recipient = booking.CustomerPhone,
            Subject   = "Booking Confirmation SMS",
            Body      = smsBody,
            Status    = "Sent",
            SentAt    = DateTime.UtcNow
        });

        await _context.SaveChangesAsync();
    }
}
