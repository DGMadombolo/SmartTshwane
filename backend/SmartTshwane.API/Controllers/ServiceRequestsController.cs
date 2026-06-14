using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartTshwane.API.DTOs;
using SmartTshwane.API.Interfaces;

namespace SmartTshwane.API.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class ServiceRequestsController : ControllerBase
{
private readonly IServiceRequestService _service;


public ServiceRequestsController(IServiceRequestService service)
{
    _service = service;
}

[HttpGet]
public async Task<IActionResult> GetAll()
{
    return Ok(await _service.GetAllAsync());
}

[HttpGet("{id}")]
public async Task<IActionResult> GetById(int id)
{
    var request = await _service.GetByIdAsync(id);

    if (request == null)
        return NotFound();

    return Ok(request);
}

[HttpPost]
public async Task<IActionResult> Create(CreateServiceRequestDto dto)
{
    var request = await _service.CreateAsync(dto);

    return CreatedAtAction(
        nameof(GetById),
        new { id = request.Requestid },
        request);
}

[HttpPut("{id}")]
public async Task<IActionResult> Update(
    int id,
    UpdateServiceRequestDto dto)
{
    var request = await _service.UpdateAsync(id, dto);

    if (request == null)
        return NotFound();

    return Ok(request);
}

[HttpDelete("{id}")]
public async Task<IActionResult> Delete(int id)
{
    var deleted = await _service.DeleteAsync(id);

    if (!deleted)
        return NotFound();

    return NoContent();
}
}
