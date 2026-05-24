using Microsoft.EntityFrameworkCore;
using SmartOffer.Core.Entities;

namespace SmartOffer.Infrastructure.Data;

public static class DbInitializer
{
    public static async Task Initialize(ApplicationDbContext context)
    {
        await context.Database.MigrateAsync();

        if (await context.Users.AnyAsync())
            return;

        var adminUser = new User
        {
            Name = "Admin User",
            Email = "admin@smartoffer.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
            Role = "Admin"
        };

        context.Users.Add(adminUser);
        await context.SaveChangesAsync();

        // Seed sample data
        await DataSeeder.SeedSampleData(context);
    }
}
