using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto;
using API.Models;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfils : Profile
    {
        public AutoMapperProfils(){

                CreateMap<City,CityDto>().ReverseMap();
                CreateMap<City,CityUpdateDto>().ReverseMap();
                CreateMap<User,LoginDto>().ReverseMap();

                
        }
        
    
    }
}