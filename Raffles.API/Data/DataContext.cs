using Raffles.API.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Raffles.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext() : base ("Server=SID13GPDWH-1\\AMSDWH; Database=Raffles;User Id=sa;Password=sqlserver2014")
        {
            Database.SetInitializer<DataContext>(new CreateDatabaseIfNotExists<DataContext>());
        }

        public DbSet<User> Users { get; set; }
    }
}