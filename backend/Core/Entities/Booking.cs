namespace SmartOffer.Core.Entities;

public class Booking
{
    public int Id { get; set; }
    public string BookingReference { get; set; } = string.Empty;
    public int OfferId { get; set; }
    public int SlotId { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string? CustomerEmail { get; set; }
    public int PeopleCount { get; set; } = 1;
    public string? SpecialNote { get; set; }
    public string Status { get; set; } = "Pending";
    public string? QRCode { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public Offer Offer { get; set; } = null!;
    public OfferSlot Slot { get; set; } = null!;
}
