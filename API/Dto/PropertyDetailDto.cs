using API.Dto;

namespace API.Dto
{
    internal class PropertyDetailDto : PropertyDto
    {

        public int CarpetAria {get;set;}
        public string Address  {get;set;}
        public string Address2 {get;set;}

        public int FloorNo {get;set;}
        public int TotalFloors{get;set;}

        public bool Gated {get;set;}
   
        public string MainEntrance {get;set;}

        public int Maintenance {get;set;}
        public int Sequrity {get;set;}

        public DateTime EstPossessionOn {get;set;}
        public int Age {get;set;}

        public string Description {get;set;}

        public ICollection<PhotoDto> Photos {get;set;}
      
    }
}