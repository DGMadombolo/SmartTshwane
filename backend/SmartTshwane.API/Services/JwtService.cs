using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using SmartTshwane.API.Models;

namespace SmartTshwane.API.Services;

public class JwtService
{
private readonly IConfiguration _configuration;

public JwtService(IConfiguration configuration)
{
    _configuration = configuration;
}

public string GenerateToken(User user)
{
    var key = _configuration["Jwt:Key"];

    var securityKey = new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes(key!));

    var credentials = new SigningCredentials(
        securityKey,
        SecurityAlgorithms.HmacSha256);

    var claims = new[]
    {
        new Claim(ClaimTypes.NameIdentifier, user.Userid.ToString()),
        new Claim(ClaimTypes.Email, user.Email ?? ""),
        new Claim(ClaimTypes.Role, user.Role ?? "Citizen")
    };

    var token = new JwtSecurityToken(
        issuer: _configuration["Jwt:Issuer"],
        audience: _configuration["Jwt:Audience"],
        claims: claims,
        expires: DateTime.Now.AddHours(1),
        signingCredentials: credentials
    );

    return new JwtSecurityTokenHandler()
        .WriteToken(token);
}


}
