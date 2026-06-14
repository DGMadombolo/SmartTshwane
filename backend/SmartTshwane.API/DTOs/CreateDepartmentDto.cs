namespace SmartTshwane.API.DTOs;

public class CreateDepartmentDto
{
    public string Departmentname { get; set; } = string.Empty;

    public string? Description { get; set; }
}