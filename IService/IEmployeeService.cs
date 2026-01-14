using EmployeeManagementSystem.Dto;
using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.IService
{
    public interface IEmployeeService
    {
        Task<IEnumerable<Employee>> GetEmployeesAsync();
        Task<Employee?> GetEmployeeByIdAsync(int id);
        Task<Employee> CreateEmployeeAsync(EmployeeDto dto);
        Task<bool> UpdateEmployeeAsync(int id, EmployeeDto dto);
        Task<bool> DeleteEmployeeAsync(int id);
    }

}
