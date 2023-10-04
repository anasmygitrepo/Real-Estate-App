using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Interfaces;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository{get;}
        ICityrepository CityRepository{get;}
        Task<bool> SaveAsync();

     
    }
}