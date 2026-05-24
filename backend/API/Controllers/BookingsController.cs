using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartOffer.Core.DTOs;
using SmartOffer.Core.Interfaces;

namespace SmartOffer.API.Controllers;

[ApiController]
[Route("api/bookings")]
public class BookingsController : ControllerBase
{
    private readonly IBookingService _service;

    public BookingsController(IBookingService service)
    {
        _service = service;
    }

    [HttpGet("lookup")]
    [AllowAnonymous]
    public async Task<ActionResult<List<BookingResponse>>> Lookup([FromQuery] string type, [FromQuery] string query)
    {
        var bookings = await _service.LookupAsync(type, query);
        return Ok(bookings);
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<List<BookingResponse>>> GetAll()
    {
        var bookings = await _service.GetAllAsync();
        return Ok(bookings);
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<ActionResult<BookingResponse>> GetById(int id)
    {
        var booking = await _service.GetByIdAsync(id);
        if (booking == null)
            return NotFound();

        return Ok(booking);
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<ActionResult<BookingResponse>> Create([FromBody] BookingRequest request)
    {
        try
        {
            var booking = await _service.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = booking.Id }, booking);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id}/status")]
    [Authorize]
    public async Task<ActionResult<BookingResponse>> UpdateStatus(int id, [FromBody] BookingStatusUpdate request)
    {
        try
        {
            var booking = await _service.UpdateStatusAsync(id, request.Status);
            return Ok(booking);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }
}
