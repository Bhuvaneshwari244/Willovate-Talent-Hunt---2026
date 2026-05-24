using Microsoft.AspNetCore.Mvc;
using SmartOffer.Core.DTOs;
using SmartOffer.Core.Interfaces;

namespace SmartOffer.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
    {
        var response = await _authService.LoginAsync(request);
        if (response == null)
            return Unauthorized(new { message = "Invalid email or password" });

        return Ok(response);
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] RegisterRequest request)
    {
        var success = await _authService.RegisterAsync(request);
        if (!success)
            return BadRequest(new { message = "Email already exists" });

        return Ok(new { message = "Registration successful" });
    }
}
