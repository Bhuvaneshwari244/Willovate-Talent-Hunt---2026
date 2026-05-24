using SmartOffer.Core.DTOs;

namespace SmartOffer.Core.Interfaces;

public interface IBusinessService
{
    Task<BusinessResponse?> GetByIdAsync(int id);
    Task<List<BusinessResponse>> GetAllAsync();
    Task<BusinessResponse> CreateAsync(BusinessRequest request);
    Task<BusinessResponse> UpdateAsync(int id, BusinessRequest request);
    Task DeleteAsync(int id);
}
