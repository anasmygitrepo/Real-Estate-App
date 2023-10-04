using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Interfaces
{
    public interface ICityrepository
    {
     
        public Task<IEnumerable<City>> GetCiteies();
        
        void AddCity(City city);

        void DeleteCity(int Id);

        Task<City> FindCity(int id);

      
    }
}