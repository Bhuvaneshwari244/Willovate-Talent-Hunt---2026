namespace SmartOffer.Core.DTOs;

public record BusinessRequest(
    string Name,
    string BusinessType,
    string OwnerName,
    string Phone,
    string Email,
    string Address,
    string City,
    string? LogoUrl,
    TimeSpan OpeningTime,
    TimeSpan ClosingTime
);

public record BusinessResponse(
    int Id,
    string Name,
    string BusinessType,
    string OwnerName,
    string Phone,
    string Email,
    string Address,
    string City,
    string? LogoUrl,
    TimeSpan OpeningTime,
    TimeSpan ClosingTime,
    DateTime CreatedAt
);
