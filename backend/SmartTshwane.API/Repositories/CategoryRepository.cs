using Microsoft.EntityFrameworkCore;
using SmartTshwane.API.Data;
using SmartTshwane.API.Interfaces;
using SmartTshwane.API.Models;

namespace SmartTshwane.API.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly ApplicationDbContext _context;

    public CategoryRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Category>> GetAllAsync()
    {
        return await _context.Categories
            .Include(c => c.Department)
            .ToListAsync();
    }

    public async Task<Category?> GetByIdAsync(int id)
    {
        return await _context.Categories
            .Include(c => c.Department)
            .FirstOrDefaultAsync(c => c.Categoryid == id);
    }

    public async Task<Category> CreateAsync(Category category)
    {
        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        return category;
    }

    public async Task<Category?> UpdateAsync(int id, Category category)
    {
        var existing = await _context.Categories
            .FirstOrDefaultAsync(c => c.Categoryid == id);

        if (existing == null)
            return null;

        existing.Categoryname = category.Categoryname;
        existing.Departmentid = category.Departmentid;

        await _context.SaveChangesAsync();

        return existing;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var category = await _context.Categories
            .FirstOrDefaultAsync(c => c.Categoryid == id);

        if (category == null)
            return false;

        _context.Categories.Remove(category);

        await _context.SaveChangesAsync();

        return true;
    }
}