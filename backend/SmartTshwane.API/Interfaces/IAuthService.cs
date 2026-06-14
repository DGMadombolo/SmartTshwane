using SmartTshwane.API.DTOs;

namespace SmartTshwane.API.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto?> RegisterAsync(RegisterDto dto);

    Task<AuthResponseDto?> LoginAsync(LoginDto dto);
}