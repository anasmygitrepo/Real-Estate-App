using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Interfaces
{
    public interface IPropertyrepository
    {
        Task<IEnumerable<Property>> GetProperties(int SellRent);
        Task<Property> GetPropertyDetail(int id);
        Task<Property> GetSingleProperty(int id);


        void AddProperty(Property property);
        void DeleteProperty(int Id);
    }
}