using Microsoft.EntityFrameworkCore;
using SmartTshwane.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// PostgreSQL Database Connection
builder.Services.AddDbContext<ApplicationDbContext>(options =>
options.UseNpgsql(
builder.Configuration.GetConnectionString("DefaultConnection")));

// Swagger / OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
app.UseSwagger();
app.UseSwaggerUI();
}

// Optional during development
// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
