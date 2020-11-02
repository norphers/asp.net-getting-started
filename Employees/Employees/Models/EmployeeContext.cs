using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
//using MySql.Data.MySqlClient;

namespace Employees.Models
{
    
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
    }
    

    /*
    public class EmployeeContext
    {
        public string ConnectionString { get; set; }

        public EmployeeContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }
    }
    */
}
