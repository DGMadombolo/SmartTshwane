using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartTshwane.API.Data;
using SmartTshwane.API.DTOs;
using SmartTshwane.API.Models;

namespace SmartTshwane.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DepartmentsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public DepartmentsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/departments
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Department>>> GetDepartments()
    {
        return await _context.Departments.ToListAsync();
    }

    // GET: api/departments/1
    [HttpGet("{id}")]
    public async Task<ActionResult<Department>> GetDepartment(int id)
    {
        var department = await _context.Departments
            .FirstOrDefaultAsync(d => d.Departmentid == id);

        if (department == null)
        {
            return NotFound();
        }

        return department;
    }

    // POST: api/departments
    [HttpPost]
    public async Task<ActionResult<Department>> CreateDepartment(
        CreateDepartmentDto dto)
    {
        var department = new Department
        {
            Departmentname = dto.Departmentname,
            Description = dto.Description
        };

        _context.Departments.Add(department);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetDepartment),
            new { id = department.Departmentid },
            department);
    }

    // PUT: api/departments/1
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDepartment(
        int id,
        UpdateDepartmentDto dto)
    {
        var department = await _context.Departments
            .FirstOrDefaultAsync(d => d.Departmentid == id);

        if (department == null)
        {
            return NotFound();
        }

        department.Departmentname = dto.Departmentname;
        department.Description = dto.Description;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/departments/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDepartment(int id)
    {
        var department = await _context.Departments
            .FirstOrDefaultAsync(d => d.Departmentid == id);

        if (department == null)
        {
            return NotFound();
        }

        _context.Departments.Remove(department);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}