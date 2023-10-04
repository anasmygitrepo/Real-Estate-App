using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Authenticate(string UserName,string Password);

        void Register(string UserName,string Password);

        Task<bool> UserAlreadyExists(string UserName);
    }
}