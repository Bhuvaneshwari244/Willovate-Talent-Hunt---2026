namespace SmartOffer.Core.DTOs;

public record SlotRequest(
    int OfferId,
    DateTime SlotDate,
    TimeSpan StartTime,
    TimeSpan EndTime,
    int Capacity
);

public record SlotResponse(
    int Id,
    int OfferId,
    DateTime SlotDate,
    TimeSpan StartTime,
    TimeSpan EndTime,
    int Capacity,
    int BookedCount,
    int AvailableCount,
    string Status,
    DateTime CreatedAt
);
