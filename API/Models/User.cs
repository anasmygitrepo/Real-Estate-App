using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class User:BaseEntity
    {
        


        [Required]
        public string Username{get;set;}

        [Required]
        public string Email{get;set;}

        [Required]
        public string Mobail{get;set;}

        [Required]
        public byte[] Password {get;set;}
        public byte[] PasswordKey {get;set;}

      
    }
}