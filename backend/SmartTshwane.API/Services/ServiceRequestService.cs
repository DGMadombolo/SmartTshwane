using SmartTshwane.API.DTOs;
using SmartTshwane.API.Interfaces;
using SmartTshwane.API.Models;

namespace SmartTshwane.API.Services;

public class ServiceRequestService : IServiceRequestService
{
    private readonly IServiceRequestRepository _repository;

    public ServiceRequestService(IServiceRequestRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<ServiceRequestDto>> GetAllAsync()
    {
        var requests = await _repository.GetAllAsync();

        return requests.Select(r => new ServiceRequestDto
        {
            Requestid = r.Requestid,
            Userid = r.Userid,
            Categoryid = r.Categoryid,
            Statusid = r.Statusid,
            Title = r.Title,
            Description = r.Description,
            Address = r.Address,
            Latitude = r.Latitude,
            Longitude = r.Longitude,
            Createdat = r.Createdat,
            Updatedat = r.Updatedat
        });
    }

    public async Task<ServiceRequestDto?> GetByIdAsync(int id)
    {
        var request = await _repository.GetByIdAsync(id);

        if (request == null)
            return null;

        return new ServiceRequestDto
        {
            Requestid = request.Requestid,
            Userid = request.Userid,
            Categoryid = request.Categoryid,
            Statusid = request.Statusid,
            Title = request.Title,
            Description = request.Description,
            Address = request.Address,
            Latitude = request.Latitude,
            Longitude = request.Longitude,
            Createdat = request.Createdat,
            Updatedat = request.Updatedat
        };
    }

    public async Task<ServiceRequestDto> CreateAsync(CreateServiceRequestDto dto)
    {
        var request = new Servicerequest
        {
            Userid = dto.Userid,
            Categoryid = dto.Categoryid,
            Statusid = 1, // Pending
            Title = dto.Title,
            Description = dto.Description,
            Address = dto.Address,
            Latitude = dto.Latitude,
            Longitude = dto.Longitude,

            // PostgreSQL column is timestamp without time zone
            Createdat = DateTime.Now,
            Updatedat = DateTime.Now
        };

        var created = await _repository.CreateAsync(request);

        return new ServiceRequestDto
        {
            Requestid = created.Requestid,
            Userid = created.Userid,
            Categoryid = created.Categoryid,
            Statusid = created.Statusid,
            Title = created.Title,
            Description = created.Description,
            Address = created.Address,
            Latitude = created.Latitude,
            Longitude = created.Longitude,
            Createdat = created.Createdat,
            Updatedat = created.Updatedat
        };
    }

    public async Task<ServiceRequestDto?> UpdateAsync(
        int id,
        UpdateServiceRequestDto dto)
    {
        var request = new Servicerequest
        {
            Categoryid = dto.Categoryid,
            Statusid = dto.Statusid,
            Title = dto.Title,
            Description = dto.Description,
            Address = dto.Address,
            Latitude = dto.Latitude,
            Longitude = dto.Longitude
        };

        var updated = await _repository.UpdateAsync(id, request);

        if (updated == null)
            return null;

        return new ServiceRequestDto
        {
            Requestid = updated.Requestid,
            Userid = updated.Userid,
            Categoryid = updated.Categoryid,
            Statusid = updated.Statusid,
            Title = updated.Title,
            Description = updated.Description,
            Address = updated.Address,
            Latitude = updated.Latitude,
            Longitude = updated.Longitude,
            Createdat = updated.Createdat,
            Updatedat = updated.Updatedat
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }
}