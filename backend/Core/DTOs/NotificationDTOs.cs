namespace SmartOffer.Core.DTOs;

public record NotificationLogResponse(
    int Id,
    int BookingId,
    string BookingReference,
    string CustomerName,
    string Channel,
    string Recipient,
    string Subject,
    string Body,
    string Status,
    DateTime SentAt
);
