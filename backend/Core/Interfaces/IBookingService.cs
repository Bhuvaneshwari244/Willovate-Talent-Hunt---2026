using SmartOffer.Core.DTOs;

namespace SmartOffer.Core.Interfaces;

public interface IBookingService
{
    Task<BookingResponse?> GetByIdAsync(int id);
    Task<List<BookingResponse>> GetAllAsync();
    Task<BookingResponse> CreateAsync(BookingRequest request);
    Task<BookingResponse> UpdateStatusAsync(int id, string status);
    Task<List<BookingResponse>> LookupAsync(string type, string query);
}
