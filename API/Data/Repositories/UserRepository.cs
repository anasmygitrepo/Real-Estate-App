using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
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
        public async Task<User> Authenticate(string username, string PasswordTxt)
        {
            var user= await _context.Users.FirstOrDefaultAsync(x=>x.Username==username);
            if(user==null || user.PasswordKey==null)
            return null;
            
            if(!MatchPassword(PasswordTxt,user.Password,user.PasswordKey))
            return null;
            
         return user;
            
        }

        private bool MatchPassword(string passwordTxt, byte[] password, byte[] passwordKey)
        {
            byte[] PasswordHash,PasswordKey;
            using (var hmac=new HMACSHA512(passwordKey))
            {
                PasswordKey=hmac.Key;
                PasswordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordTxt));
                for(int i=0;i<PasswordHash.Length;i++)
                {
                    if(PasswordHash[i]!=password[i])
                    return false;

                }   
                return true; 
                    
            }
        }

        public void Register(string UserName, string Password)
        {
            byte[] PasswordHash,PasswordKey;
            using (var hmac=new HMACSHA512())
            {
                PasswordKey=hmac.Key;
                PasswordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(Password));
            }
            var user=new User();
            {
                user.Username=UserName;
                user.Password=PasswordHash;
                user.PasswordKey=PasswordKey;

                _context.Users.Add(user);
            }
        }

        public async Task<bool> UserAlreadyExists(string UserName)
        {
            return await _context.Users.AnyAsync(x=>x.Username==UserName);
        }
    }
}