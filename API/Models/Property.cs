using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Property : BaseEntity
    {
        
        public int SellRent{get;set;} 

        [Required]
        public string Name{get;set;}
        public int BHK{get;set;}
  
        public int BuiltAria{get;set;}
        public int CarpetAria {get;set;}
        public string Address  {get;set;}
        public string Address2 {get;set;}

        public int CityId {get;set;}
        public City City {get;set;}

        public int FurnishingTypeId{get;set;}
        public FurnishingType FurnishingType {get;set;}

        public int PropertyTypeId{get;set;}
        public PropertyType propertyType {get;set;}

        public int FloorNo {get;set;}
        public int TotalFloors{get;set;}

        public bool Gated {get;set;}
        public bool ReadyToMove {get;set;}
        public string MainEntrance {get;set;}

        public int Price {get;set;}
        public int Maintenance {get;set;}
        public int Sequrity {get;set;}

        public DateTime EstPossessionOn {get;set;}
        public int Age {get;set;}

        public string Description {get;set;}
        public DateTime PostOn {get;set;}=DateTime.Now;

        [ForeignKey("User")]
        public int PostedBy {get;set;}
        public User User {get;set;}

        public ICollection <Photo> Photos{get;set;}

    }
}