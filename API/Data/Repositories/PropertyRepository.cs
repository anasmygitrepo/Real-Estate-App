using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories
{
    public class PropertyRepository : IPropertyrepository
    {

        private readonly DataContext _context;
        
        public  PropertyRepository(DataContext context){
            _context = context;
            
            
        }
        public void AddProperty(Property property)
        {
            throw new NotImplementedException();
        }

        public void DeleteProperty(int Id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Property>> GetProperties(int sellRent)
        {
            var Propertyes= await _context.Propertyes
            .Include(x=>x.propertyType)
            .Include(x=>x.FurnishingType)
            .Include(x=>x.City)
            .Where(x=>x.SellRent==sellRent).ToListAsync();
            return Propertyes;
        }

    }
}