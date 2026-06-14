using System.ComponentModel.DataAnnotations;

namespace SmartTshwane.API.DTOs;

public class RegisterDto
{
    [Required]
    [StringLength(100)]
    public string Firstname { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string Lastname { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Phonenumber { get; set; } = string.Empty;

    [Required]
    [MinLength(6)]
    public string Password { get; set; } = string.Empty;

    public string Role { get; set; } = "Citizen";
}