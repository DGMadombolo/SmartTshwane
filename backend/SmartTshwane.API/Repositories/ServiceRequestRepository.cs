using Microsoft.EntityFrameworkCore;
using SmartTshwane.API.Data;
using SmartTshwane.API.Interfaces;
using SmartTshwane.API.Models;

namespace SmartTshwane.API.Repositories;

public class ServiceRequestRepository : IServiceRequestRepository
{
    private readonly ApplicationDbContext _context;

    public ServiceRequestRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Servicerequest>> GetAllAsync()
    {
        return await _context.Servicerequests
            .Include(r => r.User)
            .Include(r => r.Category)
            .Include(r => r.Status)
            .ToListAsync();
    }

    public async Task<Servicerequest?> GetByIdAsync(int id)
    {
        return await _context.Servicerequests
            .Include(r => r.User)
            .Include(r => r.Category)
            .Include(r => r.Status)
            .FirstOrDefaultAsync(r => r.Requestid == id);
    }

    public async Task<Servicerequest> CreateAsync(Servicerequest request)
    {
        _context.Servicerequests.Add(request);

        await _context.SaveChangesAsync();

        return request;
    }

    public async Task<Servicerequest?> UpdateAsync(int id, Servicerequest request)
    {
        var existing = await _context.Servicerequests
            .FirstOrDefaultAsync(r => r.Requestid == id);

        if (existing == null)
            return null;

        existing.Title = request.Title;
        existing.Description = request.Description;
        existing.Address = request.Address;
        existing.Categoryid = request.Categoryid;
        existing.Statusid = request.Statusid;
        existing.Latitude = request.Latitude;
        existing.Longitude = request.Longitude;
        existing.Updatedat = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return existing;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var request = await _context.Servicerequests
            .FirstOrDefaultAsync(r => r.Requestid == id);

        if (request == null)
            return false;

        _context.Servicerequests.Remove(request);

        await _context.SaveChangesAsync();

        return true;
    }
}