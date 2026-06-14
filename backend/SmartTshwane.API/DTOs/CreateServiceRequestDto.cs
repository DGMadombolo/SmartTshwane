namespace SmartTshwane.API.DTOs;

public class CreateServiceRequestDto
{
    public int? Userid { get; set; }

    public int? Categoryid { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? Address { get; set; }

    public decimal? Latitude { get; set; }

    public decimal? Longitude { get; set; }
}