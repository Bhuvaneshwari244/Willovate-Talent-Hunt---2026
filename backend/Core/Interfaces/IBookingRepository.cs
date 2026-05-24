using SmartOffer.Core.Entities;

namespace SmartOffer.Core.Interfaces;

public interface IBookingRepository
{
    Task<Booking?> GetByIdAsync(int id);
    Task<List<Booking>> GetAllAsync();
    Task<Booking> CreateAsync(Booking booking);
    Task<Booking> UpdateAsync(Booking booking);
    Task<int> CountByPhoneAndOfferAsync(string phone, int offerId);
    Task<List<Booking>> LookupAsync(string type, string query);
}
