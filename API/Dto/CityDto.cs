using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace API.Dto
{
    public class CityDto
    {
        public int Id {get;set;}

        [Required(ErrorMessage ="Please eneter a City")]
        [StringLength(50, MinimumLength =2)]
        [RegularExpression(".*[a-zA-Z]+.*",ErrorMessage ="Only numeric are not allowed")]

        public string  Name {get;set;}


        [Required(ErrorMessage ="Please eneter a country")]      
        public string Country{get;set;}
    }
}