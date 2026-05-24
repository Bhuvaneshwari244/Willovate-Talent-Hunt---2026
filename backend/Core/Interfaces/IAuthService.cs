using SmartOffer.Core.DTOs;

namespace SmartOffer.Core.Interfaces;

public interface IAuthService
{
    Task<LoginResponse?> LoginAsync(LoginRequest request);
    Task<bool> RegisterAsync(RegisterRequest request);
    string GenerateJwtToken(string email, string name, string role);
}
