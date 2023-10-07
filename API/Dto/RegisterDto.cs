using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{
    public class RegisterDto
    {
        
        public string Username{get;set;}
        public string Email{get;set;}
        public string Mobail{get;set;}
        public string Password {get;set;}
    }
}