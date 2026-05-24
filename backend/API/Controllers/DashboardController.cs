using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartOffer.Core.DTOs;
using SmartOffer.Core.Interfaces;

namespace SmartOffer.API.Controllers;

[ApiController]
[Route("api/dashboard")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _service;

    public DashboardController(IDashboardService service)
    {
        _service = service;
    }

    [HttpGet("summary")]
    public async Task<ActionResult<DashboardSummary>> GetSummary()
    {
        var summary = await _service.GetSummaryAsync();
        return Ok(summary);
    }
}
