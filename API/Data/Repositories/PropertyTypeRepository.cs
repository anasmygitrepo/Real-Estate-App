using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories
{

    
    public class PropertyTypeRepository : IpropertyTypeRepository
    {
        private readonly DataContext _context;
        public PropertyTypeRepository(DataContext context){
            _context = context;
            
        }
        public async Task<IEnumerable<PropertyType>> GetPropertyType()
        {
             var PropertyTypes= await _context.ProperTypes.ToListAsync();
            return PropertyTypes;
        }
    }
}