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

        void AddProperty(Property property);
        void DeleteProperty(int Id);
    }
}