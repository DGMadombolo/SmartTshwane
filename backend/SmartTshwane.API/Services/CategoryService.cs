using SmartTshwane.API.DTOs;
using SmartTshwane.API.Interfaces;
using SmartTshwane.API.Models;

namespace SmartTshwane.API.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _repository;

    public CategoryService(ICategoryRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<CategoryDto>> GetAllAsync()
    {
        var categories = await _repository.GetAllAsync();

        return categories.Select(c => new CategoryDto
        {
            Categoryid = c.Categoryid,
            Categoryname = c.Categoryname,
            Departmentid = c.Departmentid
        });
    }

    public async Task<CategoryDto?> GetByIdAsync(int id)
    {
        var category = await _repository.GetByIdAsync(id);

        if (category == null)
            return null;

        return new CategoryDto
        {
            Categoryid = category.Categoryid,
            Categoryname = category.Categoryname,
            Departmentid = category.Departmentid
        };
    }

    public async Task<CategoryDto> CreateAsync(CreateCategoryDto dto)
    {
        var category = new Category
        {
            Categoryname = dto.Categoryname,
            Departmentid = dto.Departmentid
        };

        var created = await _repository.CreateAsync(category);

        return new CategoryDto
        {
            Categoryid = created.Categoryid,
            Categoryname = created.Categoryname,
            Departmentid = created.Departmentid
        };
    }

    public async Task<CategoryDto?> UpdateAsync(int id, UpdateCategoryDto dto)
    {
        var category = new Category
        {
            Categoryname = dto.Categoryname,
            Departmentid = dto.Departmentid
        };

        var updated = await _repository.UpdateAsync(id, category);

        if (updated == null)
            return null;

        return new CategoryDto
        {
            Categoryid = updated.Categoryid,
            Categoryname = updated.Categoryname,
            Departmentid = updated.Departmentid
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }
}