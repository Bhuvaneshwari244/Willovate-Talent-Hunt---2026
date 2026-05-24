using SmartOffer.Core.Entities;

namespace SmartOffer.Core.Interfaces;

public interface IBusinessRepository
{
    Task<Business?> GetByIdAsync(int id);
    Task<List<Business>> GetAllAsync();
    Task<Business> CreateAsync(Business business);
    Task<Business> UpdateAsync(Business business);
    Task DeleteAsync(int id);
}
