using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartOffer.Core.DTOs;
using SmartOffer.Core.Interfaces;

namespace SmartOffer.API.Controllers;

[ApiController]
[Route("api/slots")]
public class SlotsController : ControllerBase
{
    private readonly ISlotService _service;

    public SlotsController(ISlotService service)
    {
        _service = service;
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<ActionResult<SlotResponse>> GetById(int id)
    {
        var slot = await _service.GetByIdAsync(id);
        if (slot == null)
            return NotFound();

        return Ok(slot);
    }

    [HttpGet("offer/{offerId}")]
    [AllowAnonymous]
    public async Task<ActionResult<List<SlotResponse>>> GetByOfferId(int offerId)
    {
        var slots = await _service.GetByOfferIdAsync(offerId);
        return Ok(slots);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<SlotResponse>> Create([FromBody] SlotRequest request)
    {
        var slot = await _service.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = slot.Id }, slot);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<SlotResponse>> Update(int id, [FromBody] SlotRequest request)
    {
        try
        {
            var slot = await _service.UpdateAsync(id, request);
            return Ok(slot);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
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
