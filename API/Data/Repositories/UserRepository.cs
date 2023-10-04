using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        public DataContext _context { get; }

        public  UserRepository(DataContext context){
            _context = context;
            
        }
        public async Task<User> Authenticate(string username, string Password)
        {
            return await _context.Users.FirstOrDefaultAsync(x=>x.Username==username && x.Password==Password);
        }
    }
}