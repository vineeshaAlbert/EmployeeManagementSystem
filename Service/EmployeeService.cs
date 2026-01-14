using EmployeeManagementSystem.Dto;
using EmployeeManagementSystem.IRepository;
using EmployeeManagementSystem.IService;
using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _repository;

        public EmployeeService(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Employee>> GetEmployeesAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Employee?> GetEmployeeByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Employee> CreateEmployeeAsync(EmployeeDto dto)
        {
            var employee = new Employee
            {
                Name = dto.Name,
                Email = dto.Email,
                Department = dto.Department,
                Salary = dto.Salary
            };

            await _repository.AddAsync(employee);
            return employee;
        }

        public async Task<bool> UpdateEmployeeAsync(int id, EmployeeDto dto)
        {
            var employee = await _repository.GetByIdAsync(id);
            if (employee == null) return false;

            employee.Name = dto.Name;
            employee.Email = dto.Email;
            employee.Department = dto.Department;
            employee.Salary = dto.Salary;

            await _repository.UpdateAsync(employee);
            return true;
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var employee = await _repository.GetByIdAsync(id);
            if (employee == null) return false;

            await _repository.DeleteAsync(employee);
            return true;
        }
    }

}
