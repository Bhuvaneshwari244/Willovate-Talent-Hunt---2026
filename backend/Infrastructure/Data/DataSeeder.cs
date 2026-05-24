using SmartOffer.Core.Entities;

namespace SmartOffer.Infrastructure.Data;

public static class DataSeeder
{
    public static async Task SeedSampleData(ApplicationDbContext context)
    {
        // Check if data already exists
        if (context.Businesses.Any())
            return;

        // Create Businesses
        var businesses = new List<Business>
        {
            new Business
            {
                Name = "FitZone Gym",
                BusinessType = "Gym",
                OwnerName = "John Doe",
                Phone = "9876543210",
                Email = "contact@fitzone.com",
                Address = "123 Main Street, Andheri",
                City = "Mumbai",
                OpeningTime = new TimeSpan(6, 0, 0),
                ClosingTime = new TimeSpan(22, 0, 0),
                CreatedAt = DateTime.UtcNow
            },
            new Business
            {
                Name = "Bella Salon & Spa",
                BusinessType = "Salon",
                OwnerName = "Sarah Smith",
                Phone = "9876543211",
                Email = "info@bellasalon.com",
                Address = "456 Park Avenue, Connaught Place",
                City = "Delhi",
                OpeningTime = new TimeSpan(9, 0, 0),
                ClosingTime = new TimeSpan(20, 0, 0),
                CreatedAt = DateTime.UtcNow
            },
            new Business
            {
                Name = "TechCoach Academy",
                BusinessType = "Coaching",
                OwnerName = "Amit Kumar",
                Phone = "9876543212",
                Email = "info@techcoach.com",
                Address = "789 MG Road, Koramangala",
                City = "Bangalore",
                OpeningTime = new TimeSpan(8, 0, 0),
                ClosingTime = new TimeSpan(21, 0, 0),
                CreatedAt = DateTime.UtcNow
            }
        };

        context.Businesses.AddRange(businesses);
        await context.SaveChangesAsync();

        // Create Offers
        var offers = new List<Offer>
        {
            new Offer
            {
                BusinessId = businesses[0].Id,
                Title = "Morning Gym Trial - Full Access",
                Description = "Experience our state-of-the-art gym facilities with full access to all equipment, group classes, and personal training consultation. Perfect for fitness enthusiasts looking to kickstart their journey!",
                Category = "Fitness",
                OriginalPrice = 999,
                OfferPrice = 99,
                DiscountPercentage = 90,
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddDays(60),
                MaxBookingPerCustomer = 1,
                TermsAndConditions = "Valid for new members only. One-time use per customer. Must bring valid ID. Not combinable with other offers.",
                Status = "Active",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Offer
            {
                BusinessId = businesses[0].Id,
                Title = "Evening Workout Session",
                Description = "Join our evening workout sessions with certified trainers. Includes access to cardio zone, weight training area, and group fitness classes.",
                Category = "Fitness",
                OriginalPrice = 799,
                OfferPrice = 199,
                DiscountPercentage = 75,
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddDays(60),
                MaxBookingPerCustomer = 2,
                TermsAndConditions = "Valid Monday to Friday only. Advance booking required.",
                Status = "Active",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Offer
            {
                BusinessId = businesses[1].Id,
                Title = "Hair Styling & Spa Package",
                Description = "Pamper yourself with our premium hair styling and relaxing spa treatment. Includes haircut, styling, hair spa, and 30-minute relaxing massage.",
                Category = "Beauty",
                OriginalPrice = 2499,
                OfferPrice = 999,
                DiscountPercentage = 60,
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddDays(60),
                MaxBookingPerCustomer = 1,
                TermsAndConditions = "Advance booking required. Subject to stylist availability. Valid for both men and women.",
                Status = "Active",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Offer
            {
                BusinessId = businesses[2].Id,
                Title = "Python Programming Bootcamp - Demo Class",
                Description = "Free demo class for our comprehensive Python programming bootcamp. Learn basics of Python, data structures, and build your first project!",
                Category = "Education",
                OriginalPrice = 500,
                OfferPrice = 1,
                DiscountPercentage = 99,
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddDays(60),
                MaxBookingPerCustomer = 1,
                TermsAndConditions = "Demo class. No prior programming experience required. Laptop required.",
                Status = "Active",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        };

        context.Offers.AddRange(offers);
        await context.SaveChangesAsync();

        // Create Slots
        var slots = new List<OfferSlot>
        {
            // Gym Morning slots
            new OfferSlot
            {
                OfferId = offers[0].Id,
                SlotDate = DateTime.UtcNow.Date.AddDays(1),
                StartTime = new TimeSpan(6, 0, 0),
                EndTime = new TimeSpan(8, 0, 0),
                Capacity = 10,
                BookedCount = 3,
                Status = "Available",
                CreatedAt = DateTime.UtcNow
            },
            new OfferSlot
            {
                OfferId = offers[0].Id,
                SlotDate = DateTime.UtcNow.Date.AddDays(3),
                StartTime = new TimeSpan(6, 0, 0),
                EndTime = new TimeSpan(8, 0, 0),
                Capacity = 10,
                BookedCount = 2,
                Status = "Available",
                CreatedAt = DateTime.UtcNow
            },
            new OfferSlot
            {
                OfferId = offers[0].Id,
                SlotDate = DateTime.UtcNow.Date.AddDays(5),
                StartTime = new TimeSpan(6, 0, 0),
                EndTime = new TimeSpan(8, 0, 0),
                Capacity = 10,
                BookedCount = 0,
                Status = "Available",
                CreatedAt = DateTime.UtcNow
            },
            // Gym Evening slots
            new OfferSlot
            {
                OfferId = offers[1].Id,
                SlotDate = DateTime.UtcNow.Date.AddDays(1),
                StartTime = new TimeSpan(18, 0, 0),
                EndTime = new TimeSpan(20, 0, 0),
                Capacity = 15,
                BookedCount = 5,
                Status = "Available",
                CreatedAt = DateTime.UtcNow
            },
            new OfferSlot
            {
                OfferId = offers[1].Id,
                SlotDate = DateTime.UtcNow.Date.AddDays(3),
                StartTime = new TimeSpan(18, 0, 0),
                EndTime = new TimeSpan(20, 0, 0),
                Capacity = 15,
                BookedCount = 4,
                Status = "Available",
                CreatedAt = DateTime.UtcNow
            },
            // Salon slots
            new OfferSlot
            {
                OfferId = offers[2].Id,
                SlotDate = DateTime.UtcNow.Date.AddDays(2),
                StartTime = new TimeSpan(10, 0, 0),
                EndTime = new TimeSpan(12, 0, 0),
                Capacity = 5,
                BookedCount = 2,
                Status = "Available",
                CreatedAt = DateTime.UtcNow
            },
            new OfferSlot
            {
                OfferId = offers[2].Id,
                SlotDate = DateTime.UtcNow.Date.AddDays(2),
                StartTime = new TimeSpan(14, 0, 0),
                EndTime = new TimeSpan(16, 0, 0),
                Capacity = 5,
                BookedCount = 1,
                Status = "Available",
                CreatedAt = DateTime.UtcNow
            },
            // Coaching slots
            new OfferSlot
            {
                OfferId = offers[3].Id,
                SlotDate = DateTime.UtcNow.Date.AddDays(2),
                StartTime = new TimeSpan(10, 0, 0),
                EndTime = new TimeSpan(12, 0, 0),
                Capacity = 20,
                BookedCount = 8,
                Status = "Available",
                CreatedAt = DateTime.UtcNow
            },
            new OfferSlot
            {
                OfferId = offers[3].Id,
                SlotDate = DateTime.UtcNow.Date.AddDays(4),
                StartTime = new TimeSpan(15, 0, 0),
                EndTime = new TimeSpan(17, 0, 0),
                Capacity = 20,
                BookedCount = 6,
                Status = "Available",
                CreatedAt = DateTime.UtcNow
            }
        };

        context.OfferSlots.AddRange(slots);
        await context.SaveChangesAsync();

        // Create Sample Bookings
        var bookings = new List<Booking>
        {
            new Booking
            {
                BookingReference = $"BK{DateTime.UtcNow:yyyyMMddHHmmss}0001",
                OfferId = offers[0].Id,
                SlotId = slots[0].Id,
                CustomerName = "Raj Kumar",
                CustomerPhone = "9123456789",
                CustomerEmail = "raj@example.com",
                PeopleCount = 1,
                Status = "Confirmed",
                CreatedAt = DateTime.UtcNow
            },
            new Booking
            {
                BookingReference = $"BK{DateTime.UtcNow:yyyyMMddHHmmss}0002",
                OfferId = offers[2].Id,
                SlotId = slots[4].Id,
                CustomerName = "Priya Sharma",
                CustomerPhone = "9123456790",
                CustomerEmail = "priya@example.com",
                PeopleCount = 1,
                Status = "Pending",
                CreatedAt = DateTime.UtcNow
            },
            new Booking
            {
                BookingReference = $"BK{DateTime.UtcNow:yyyyMMddHHmmss}0003",
                OfferId = offers[1].Id,
                SlotId = slots[2].Id,
                CustomerName = "Amit Patel",
                CustomerPhone = "9123456791",
                PeopleCount = 1,
                Status = "Confirmed",
                CreatedAt = DateTime.UtcNow
            }
        };

        context.Bookings.AddRange(bookings);
        await context.SaveChangesAsync();
    }
}
