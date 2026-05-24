namespace SmartOffer.Core.Entities;

public class OfferSlot
{
    public int Id { get; set; }
    public int OfferId { get; set; }
    public DateTime SlotDate { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public int Capacity { get; set; }
    public int BookedCount { get; set; } = 0;
    public string Status { get; set; } = "Available";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public Offer Offer { get; set; } = null!;
    public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    
    public int AvailableCount => Capacity - BookedCount;
    public bool IsFull => BookedCount >= Capacity;
}
