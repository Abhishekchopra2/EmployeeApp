using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EmployeeAPIs.Models;

namespace EmployeeAPIs.Repositories
{
    public class EmployeeRepo : IEmployeeRepo
    {
        public List<Employee> GetEmployees()
        {
            using (var db = new EmployeeDbEntities())
            {
                return db.Employees.ToList();
            }
        }

        public Employee GetEmployeById(long id)
        {
            using (var db = new EmployeeDbEntities())
            {
                return db.Employees.Where(x => x.Id == id).FirstOrDefault();
            }
        }

        public void SaveEmployee(Employee employee)
        {
            using (var db = new EmployeeDbEntities())
            {
                db.Employees.Add(new Employee()
                {
                    Name = employee.Name,
                    Email = employee.Email,
                    Type = string.IsNullOrEmpty(employee.Type) ? "Permanent" : employee.Type,
                    DateOfJoining = employee.DateOfJoining == null ? DateTime.Now.Date : employee.DateOfJoining
                });

                db.SaveChanges();
            }
        }

        public void UpdateEmployee(long id, Employee employee)
        {
            using (var db = new EmployeeDbEntities())
            {
                var existingEmployee = db.Employees.Where(x => x.Id == id).FirstOrDefault();

                if (existingEmployee != null)
                {
                    existingEmployee.Name = employee.Name;
                    existingEmployee.Email = employee.Email;
                    existingEmployee.Type = employee.Type;
                    existingEmployee.DateOfJoining = employee.DateOfJoining;

                    db.Entry(existingEmployee).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                }
            }
        }

        public void DeleteEmployee(long id)
        {
            using (var db = new EmployeeDbEntities())
            {
                var existingEmployee = db.Employees.Where(x => x.Id == id).FirstOrDefault();

                if (existingEmployee != null)
                {
                    db.Entry(existingEmployee).State = System.Data.Entity.EntityState.Deleted;
                    db.SaveChanges();
                }
            }
        }

        public List<int> GetEmployeeCountByMonth()
        {
            var countList = new List<int>();
            using (var db = new EmployeeDbEntities())
            {
                countList.Add(db.Employees.Where(x => x.DateOfJoining.Value.Month == 1).Count());
                countList.Add(db.Employees.Where(x => x.DateOfJoining.Value.Month == 2).Count());
                countList.Add(db.Employees.Where(x => x.DateOfJoining.Value.Month == 3).Count());
                countList.Add(db.Employees.Where(x => x.DateOfJoining.Value.Month == 4).Count());
                countList.Add(db.Employees.Where(x => x.DateOfJoining.Value.Month == 5).Count());
                countList.Add(db.Employees.Where(x => x.DateOfJoining.Value.Month == 6).Count());
            }
            return countList;
        }

        public List<int> GetEmployeeCountByType()
        {
            var countList = new List<int>();
            using (var db = new EmployeeDbEntities())
            {
                countList.Add(db.Employees.Where(x => x.Type.ToLower() == "permanent").Count());
                countList.Add(db.Employees.Where(x => x.Type.ToLower() == "contract").Count());
            }
            return countList;
        }
    }
}