using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartOffer.Core.DTOs;
using SmartOffer.Core.Interfaces;

namespace SmartOffer.API.Controllers;

[ApiController]
[Route("api/business")]
[Authorize]
public class BusinessController : ControllerBase
{
    private readonly IBusinessService _service;

    public BusinessController(IBusinessService service)
    {
        _service = service;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<List<BusinessResponse>>> GetAll()
    {
        var businesses = await _service.GetAllAsync();
        return Ok(businesses);
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<ActionResult<BusinessResponse>> GetById(int id)
    {
        var business = await _service.GetByIdAsync(id);
        if (business == null)
            return NotFound();

        return Ok(business);
    }

    [HttpPost]
    public async Task<ActionResult<BusinessResponse>> Create([FromBody] BusinessRequest request)
    {
        var business = await _service.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = business.Id }, business);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<BusinessResponse>> Update(int id, [FromBody] BusinessRequest request)
    {
        try
        {
            var business = await _service.UpdateAsync(id, request);
            return Ok(business);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}
