using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartTshwane.API.DTOs;
using SmartTshwane.API.Interfaces;
using System.Security.Claims;

namespace SmartTshwane.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
private readonly IAuthService _authService;


public AuthController(IAuthService authService)
{
    _authService = authService;
}

[HttpPost("register")]
public async Task<IActionResult> Register(RegisterDto dto)
{
    var result = await _authService.RegisterAsync(dto);

    if (result == null)
        return BadRequest("Email already exists.");

    return Ok(result);
}

[HttpPost("login")]
public async Task<IActionResult> Login(LoginDto dto)
{
    var result = await _authService.LoginAsync(dto);

    if (result == null)
        return Unauthorized();

    return Ok(result);
}

[HttpGet("me")]
[Authorize]
public IActionResult Me()
{
    return Ok(new
    {
        UserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value,
        Email = User.FindFirst(ClaimTypes.Email)?.Value,
        Role = User.FindFirst(ClaimTypes.Role)?.Value
    });
}


}
