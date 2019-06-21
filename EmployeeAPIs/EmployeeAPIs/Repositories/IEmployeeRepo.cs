using EmployeeAPIs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeAPIs.Repositories
{
    public interface IEmployeeRepo
    {
        List<Employee> GetEmployees();
        Employee GetEmployeById(long id);
        void SaveEmployee(Employee employee);
        void UpdateEmployee(long id, Employee employee);
        void DeleteEmployee(long id);
        List<int> GetEmployeeCountByMonth();
        List<int> GetEmployeeCountByType();
    }
}
