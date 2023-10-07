using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Photo :BaseEntity
    {
        
        [Required]
        public string ImageUrl {get;set;}
        public bool IsPrimary  {get;set;}

        public int PropertyTypeId {get;set;}
        public Property Property {get;set;}
    }
}