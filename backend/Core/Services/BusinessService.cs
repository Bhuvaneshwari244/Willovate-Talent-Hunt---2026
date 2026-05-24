using SmartOffer.Core.DTOs;
using SmartOffer.Core.Entities;
using SmartOffer.Core.Interfaces;

namespace SmartOffer.Core.Services;

public class BusinessService : IBusinessService
{
    private readonly IBusinessRepository _repository;

    public BusinessService(IBusinessRepository repository)
    {
        _repository = repository;
    }

    public async Task<BusinessResponse?> GetByIdAsync(int id)
    {
        var business = await _repository.GetByIdAsync(id);
        return business == null ? null : MapToResponse(business);
    }

    public async Task<List<BusinessResponse>> GetAllAsync()
    {
        var businesses = await _repository.GetAllAsync();
        return businesses.Select(MapToResponse).ToList();
    }

    public async Task<BusinessResponse> CreateAsync(BusinessRequest request)
    {
        var business = new Business
        {
            Name = request.Name,
            BusinessType = request.BusinessType,
            OwnerName = request.OwnerName,
            Phone = request.Phone,
            Email = request.Email,
            Address = request.Address,
            City = request.City,
            LogoUrl = request.LogoUrl,
            OpeningTime = request.OpeningTime,
            ClosingTime = request.ClosingTime
        };

        var created = await _repository.CreateAsync(business);
        return MapToResponse(created);
    }

    public async Task<BusinessResponse> UpdateAsync(int id, BusinessRequest request)
    {
        var business = await _repository.GetByIdAsync(id) 
            ?? throw new KeyNotFoundException($"Business with ID {id} not found");

        business.Name = request.Name;
        business.BusinessType = request.BusinessType;
        business.OwnerName = request.OwnerName;
        business.Phone = request.Phone;
        business.Email = request.Email;
        business.Address = request.Address;
        business.City = request.City;
        business.LogoUrl = request.LogoUrl;
        business.OpeningTime = request.OpeningTime;
        business.ClosingTime = request.ClosingTime;

        var updated = await _repository.UpdateAsync(business);
        return MapToResponse(updated);
    }

    public async Task DeleteAsync(int id)
    {
        await _repository.DeleteAsync(id);
    }

    private static BusinessResponse MapToResponse(Business business) => new(
        business.Id,
        business.Name,
        business.BusinessType,
        business.OwnerName,
        business.Phone,
        business.Email,
        business.Address,
        business.City,
        business.LogoUrl,
        business.OpeningTime,
        business.ClosingTime,
        business.CreatedAt
    );
}
