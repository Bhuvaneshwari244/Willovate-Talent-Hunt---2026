namespace SmartOffer.Core.Entities;

public class NotificationLog
{
    public int Id { get; set; }
    public int BookingId { get; set; }
    public string Channel { get; set; } = string.Empty;   // "Email" | "SMS"
    public string Recipient { get; set; } = string.Empty; // email or phone
    public string Subject { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public string Status { get; set; } = "Sent";          // "Sent" | "Failed"
    public DateTime SentAt { get; set; } = DateTime.UtcNow;

    public Booking Booking { get; set; } = null!;
}
