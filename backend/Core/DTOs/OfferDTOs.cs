namespace SmartOffer.Core.DTOs;

public record OfferRequest(
    int BusinessId,
    string Title,
    string Description,
    string Category,
    decimal OriginalPrice,
    decimal OfferPrice,
    DateTime StartDate,
    DateTime EndDate,
    int MaxBookingPerCustomer,
    string? TermsAndConditions,
    string Status
);

public record OfferResponse(
    int Id,
    int BusinessId,
    string BusinessName,
    string Title,
    string Description,
    string Category,
    decimal OriginalPrice,
    decimal OfferPrice,
    decimal DiscountPercentage,
    DateTime StartDate,
    DateTime EndDate,
    int MaxBookingPerCustomer,
    string? TermsAndConditions,
    string Status,
    int TotalSlots,
    int AvailableSlots,
    DateTime CreatedAt
);

public record OfferListItem(
    int Id,
    string Title,
    string BusinessName,
    string Category,
    decimal OriginalPrice,
    decimal OfferPrice,
    decimal DiscountPercentage,
    int AvailableSlots,
    DateTime EndDate,
    string Status
);
