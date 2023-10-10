using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories
{

    public class PropertyFurnishingTypeRepository : IPropertyFurnishingTypeRepository
    {
        public DataContext Context { get; }
        
        public PropertyFurnishingTypeRepository(DataContext context){
            Context = context;
        

        }
        public async Task<IEnumerable<FurnishingType>> GetFurnisingType()
        {
            var FurnishinTypes= await Context.FurnishingTypes.ToListAsync();
            return FurnishinTypes;
        }
    }
}