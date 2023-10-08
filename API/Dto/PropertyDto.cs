using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{
    public class PropertyDto
    {
         

        public int Id {get;set;}

        public int SellRent{get;set;} 
        public string Name{get;set;}
        public int BHK{get;set;}
  
        public int BuiltAria{get;set;}
    
        public string City {get;set;}

        public string FurnishingType {get;set;}

        public string propertyType {get;set;}
        public bool ReadyToMove {get;set;}
        public string Country {get;set;}

        public int Price {get;set;}
        
    }
}