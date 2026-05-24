using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartOffer.Core.DTOs;
using SmartOffer.Core.Interfaces;

namespace SmartOffer.API.Controllers;

[ApiController]
[Route("api/offers")]
public class OffersController : ControllerBase
{
    private readonly IOfferService _service;

    public OffersController(IOfferService service)
    {
        _service = service;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<List<OfferListItem>>> GetAll([FromQuery] bool activeOnly = false)
    {
        var offers = activeOnly 
            ? await _service.GetActiveOffersAsync() 
            : await _service.GetAllAsync();
        return Ok(offers);
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<ActionResult<OfferResponse>> GetById(int id)
    {
        var offer = await _service.GetByIdAsync(id);
        if (offer == null)
            return NotFound();

        return Ok(offer);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<OfferResponse>> Create([FromBody] OfferRequest request)
    {
        try
        {
            var offer = await _service.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = offer.Id }, offer);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<OfferResponse>> Update(int id, [FromBody] OfferRequest request)
    {
        try
        {
            var offer = await _service.UpdateAsync(id, request);
            return Ok(offer);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}
