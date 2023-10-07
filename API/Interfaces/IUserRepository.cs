using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Dto;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Authenticate(string UserName,string Password);

        void Register(RegisterDto user);

        Task<bool> UserAlreadyExists(string UserName);
    }
}