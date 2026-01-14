using EmployeeManagementSystem.Dto;
using EmployeeManagementSystem.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystem.Controllers
{
  
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _service;

        public EmployeesController(IEmployeeService service)
        {
            _service = service;
        }

        [HttpGet("employees-List")]
        public async Task<IActionResult> Get()
            => Ok(await _service.GetEmployeesAsync());

        [HttpGet("employees/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var emp = await _service.GetEmployeeByIdAsync(id);
            return emp == null ? NotFound() : Ok(emp);
        }

        [HttpPost("employees")]
        public async Task<IActionResult> Post(EmployeeDto dto)
        {
            var emp = await _service.CreateEmployeeAsync(dto);
            return CreatedAtAction(nameof(Get), new { id = emp.EmployeeId }, emp);
        }

        [HttpPut("employee/{id}")]
        public async Task<IActionResult> Put(int id, EmployeeDto dto)
        {
            var result = await _service.UpdateEmployeeAsync(id, dto);
            return result ? NoContent() : NotFound();
        }

        [HttpDelete("employee/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteEmployeeAsync(id);
            return result ? NoContent() : NotFound();
        }
    }

}
