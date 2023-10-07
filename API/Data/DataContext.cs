using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions <DataContext> options):base(options){}
        
            public DbSet <City> Cities {get; set;}

            public DbSet <User> Users{get;set;}

            public DbSet <Property> Propertyes {get;set;}
            public DbSet <PropertyType> ProperTypes {get;set;}
            public DbSet <FurnishingType> FurnishingTypes {get;set;}
            public DbSet <Photo> Photos {get;set;}
            

        
        
    }
}