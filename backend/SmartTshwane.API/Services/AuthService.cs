using Microsoft.EntityFrameworkCore;
using SmartTshwane.API.Data;
using SmartTshwane.API.DTOs;
using SmartTshwane.API.Interfaces;
using SmartTshwane.API.Models;

namespace SmartTshwane.API.Services;

public class AuthService : IAuthService
{
private readonly ApplicationDbContext _context;
private readonly JwtService _jwtService;


public AuthService(
    ApplicationDbContext context,
    JwtService jwtService)
{
    _context = context;
    _jwtService = jwtService;
}

public async Task<AuthResponseDto?> RegisterAsync(RegisterDto dto)
{
    var existingUser = await _context.Users
        .FirstOrDefaultAsync(u => u.Email == dto.Email);

    if (existingUser != null)
        return null;

    var user = new User
    {
        Firstname = dto.Firstname,
        Lastname = dto.Lastname,
        Email = dto.Email,
        Phonenumber = dto.Phonenumber,
        Passwordhash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
        Role = dto.Role,
        Createdat = DateTime.Now
    };

    _context.Users.Add(user);

    await _context.SaveChangesAsync();

    var token = _jwtService.GenerateToken(user);

    return new AuthResponseDto
    {
        UserId = user.Userid,
        Firstname = user.Firstname ?? "",
        Lastname = user.Lastname ?? "",
        Email = user.Email ?? "",
        Role = user.Role ?? "",
        Token = token
    };
}

public async Task<AuthResponseDto?> LoginAsync(LoginDto dto)
{
    var user = await _context.Users
        .FirstOrDefaultAsync(u => u.Email == dto.Email);

    if (user == null)
        return null;

    if (!BCrypt.Net.BCrypt.Verify(
        dto.Password,
        user.Passwordhash))
    {
        return null;
    }

    var token = _jwtService.GenerateToken(user);

    return new AuthResponseDto
    {
        UserId = user.Userid,
        Firstname = user.Firstname ?? "",
        Lastname = user.Lastname ?? "",
        Email = user.Email ?? "",
        Role = user.Role ?? "",
        Token = token
    };
}


}
