using EmployeeAPIs.Filters;
using EmployeeAPIs.Models;
using EmployeeAPIs.Repositories;
using System.Web.Http;

namespace EmployeeAPIs.Controllers
{
    [EmployeeExceptionFilter]
    public class EmployeeController : ApiController
    {
        private readonly IEmployeeRepo employeeService;
        public EmployeeController(IEmployeeRepo _employeeService)
        {
            employeeService = _employeeService;
        }

        // GET api/employee
        public IHttpActionResult GetAll()
        {
            var employees = employeeService.GetEmployees();

            if (employees.Count == 0)
            {
                return NotFound();
            }

            return Ok(employees);
        }

        // GET api/employee/5
        public IHttpActionResult GetById(long id)
        {
            var employee = employeeService.GetEmployeById(id);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        // POST api/employee
        public IHttpActionResult Post([FromBody]Employee employee)
        {
            employeeService.SaveEmployee(employee);
            return Ok();
        }

        // PUT api/employee/5
        public IHttpActionResult Put(long id, [FromBody]Employee employee)
        {
            employeeService.UpdateEmployee(id, employee);
            return Ok();
        }

        // DELETE api/employee/5
        public IHttpActionResult Delete(long id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }

            employeeService.DeleteEmployee(id);
            return Ok();
        }

        [Route("api/employee/getcount/month")]
        public IHttpActionResult GetEmployeeCountByMonth()
        {
            return Ok(employeeService.GetEmployeeCountByMonth()); 
        }

        [Route("api/employee/getcount/type")]
        public IHttpActionResult GetEmployeeCountByType()
        {
            return Ok(employeeService.GetEmployeeCountByType());
        }
    }
}
