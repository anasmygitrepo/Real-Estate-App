using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;
using API.Data.Interfaces;
using API.Dto;

namespace API.Data.Repositories
{
    public class CityRepository : ICityrepository
    {
        public DataContext context { get; }
        public CityRepository(DataContext _context){
            context = _context;

        }

        public void AddCity(City city)
        {
           context.Cities.AddAsync(city);
           
        }

        public void DeleteCity(int Id)
        {
            var city=context.Cities.Find(Id);
            context.Cities.Remove(city);
        }

        public async Task<IEnumerable<City>> GetCiteies()
        {
            return await context.Cities.ToListAsync();
        }

        public async Task<City> FindCity(int id)
        {
            return await context.Cities.FindAsync(id); 
        }
    }
}