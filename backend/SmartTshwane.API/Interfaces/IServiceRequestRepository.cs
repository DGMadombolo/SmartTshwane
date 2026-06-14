using SmartTshwane.API.Models;

namespace SmartTshwane.API.Interfaces;

public interface IServiceRequestRepository
{
    Task<IEnumerable<Servicerequest>> GetAllAsync();
    Task<Servicerequest?> GetByIdAsync(int id);
    Task<Servicerequest> CreateAsync(Servicerequest request);
    Task<Servicerequest?> UpdateAsync(int id, Servicerequest request);
    Task<bool> DeleteAsync(int id);
}