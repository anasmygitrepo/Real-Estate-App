
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
                CreateMap<PropertyType,IdTextDto>().ReverseMap();
                CreateMap<FurnishingType,IdTextDto>().ReverseMap();
                CreateMap<Property,AddPropertyDto>().ReverseMap();


                         //source  //destination
                CreateMap<Property,PropertyDto>()
                .ForMember(x=>x.City, opt=>opt.MapFrom(x=>x.City.Name))
                .ForMember(x=>x.Country, opt=>opt.MapFrom(x=>x.City.Country))
                .ForMember(x=>x.propertyType,opt=>opt.MapFrom(x=>x.propertyType.Name))
                .ForMember(x=>x.FurnishingType,opt=>opt.MapFrom(x=>x.FurnishingType.Name));

                CreateMap<Property,PropertyDetailDto>()
                .ForMember(x=>x.City, opt=>opt.MapFrom(x=>x.City.Name))
                .ForMember(x=>x.Country, opt=>opt.MapFrom(x=>x.City.Country))
                .ForMember(x=>x.propertyType,opt=>opt.MapFrom(x=>x.propertyType.Name))
                .ForMember(x=>x.FurnishingType,opt=>opt.MapFrom(x=>x.FurnishingType.Name));


                
        }
        
    
    }
}