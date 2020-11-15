using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Employees.Models;

namespace Employees.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin() //.WithOrigins("https://www.example.com") -> to allow requests just from the specified source
                    .AllowAnyMethod() //.WithMethods("POST", "GET") -> to allow only specified HTTP methods
                    .AllowAnyHeader()); //.WithHeaders("accept", "content-type") -> to allow only specified headers
            });
        }

        public static void ConfigureIISIntegration(this IServiceCollection services)
        {
            services.Configure<IISOptions>(options =>
            {
                /*
                default methods:
                    AutomaticAuthentication = true;
                    AuthenticationDisplayName = null;
                    ForwordClientCertificate = true;
                */
            });
        }

        /*
        public static void ConfigureLoggerService(this IServiceCollection services)
        {
            services.AddSingleton<ILoggerManager, LoggerManager>();
        }
        */

        public static void ConfigureMySqlContext(this IServiceCollection services, IConfiguration config)
        {
            var connectionString = config["mysqlconnection:connectionString"];
            services.AddDbContext<EmployeeContext>(o => o.UseMySql(connectionString));
        }

    }
}
