using Microsoft.EntityFrameworkCore;
using SmartOffer.Core.Entities;

namespace SmartOffer.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Business> Businesses { get; set; }
    public DbSet<Offer> Offers { get; set; }
    public DbSet<OfferSlot> OfferSlots { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<NotificationLog> NotificationLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
        });

        modelBuilder.Entity<Business>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Phone).IsRequired().HasMaxLength(20);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
        });

        modelBuilder.Entity<Offer>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.OriginalPrice).HasColumnType("decimal(18,2)");
            entity.Property(e => e.OfferPrice).HasColumnType("decimal(18,2)");
            entity.Property(e => e.DiscountPercentage).HasColumnType("decimal(5,2)");
            
            entity.HasOne(e => e.Business)
                .WithMany(b => b.Offers)
                .HasForeignKey(e => e.BusinessId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<OfferSlot>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.HasOne(e => e.Offer)
                .WithMany(o => o.Slots)
                .HasForeignKey(e => e.OfferId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.BookingReference).IsUnique();
            entity.Property(e => e.CustomerName).IsRequired().HasMaxLength(100);
            entity.Property(e => e.CustomerPhone).IsRequired().HasMaxLength(20);
            
            entity.HasOne(e => e.Offer)
                .WithMany(o => o.Bookings)
                .HasForeignKey(e => e.OfferId)
                .OnDelete(DeleteBehavior.Restrict);
                
            entity.HasOne(e => e.Slot)
                .WithMany(s => s.Bookings)
                .HasForeignKey(e => e.SlotId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<NotificationLog>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Booking)
                .WithMany()
                .HasForeignKey(e => e.BookingId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
