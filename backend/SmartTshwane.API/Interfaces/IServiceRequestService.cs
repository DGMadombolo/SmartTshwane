using SmartTshwane.API.DTOs;

namespace SmartTshwane.API.Interfaces;

public interface IServiceRequestService
{
    Task<IEnumerable<ServiceRequestDto>> GetAllAsync();
    Task<ServiceRequestDto?> GetByIdAsync(int id);
    Task<ServiceRequestDto> CreateAsync(CreateServiceRequestDto dto);
    Task<ServiceRequestDto?> UpdateAsync(int id, UpdateServiceRequestDto dto);
    Task<bool> DeleteAsync(int id);
}