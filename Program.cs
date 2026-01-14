using EmployeeManagementSystem.Data;
using EmployeeManagementSystem.IRepository;
using EmployeeManagementSystem.IService;
using EmployeeManagementSystem.Repository;
using EmployeeManagementSystem.Service;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // =========================
            // ADD SERVICES
            // =========================

            // Controllers
            builder.Services.AddControllers();

            // Swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // DbContext
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("DefaultConnection")));

            // Dependency Injection
            builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            builder.Services.AddScoped<IEmployeeService, EmployeeService>();

            // CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                    policy.AllowAnyOrigin()                 

                          .AllowAnyMethod()
                          .AllowAnyHeader());
            });

            // =========================
            // BUILD APP
            // =========================
            var app = builder.Build();

            // =========================
            // MIDDLEWARE
            // =========================

            // Swagger middleware
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("AllowAll");

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
