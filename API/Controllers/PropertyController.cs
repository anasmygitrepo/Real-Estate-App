
using API.Dto;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using API.Models;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyController : BaseController
    {
        private readonly IUnitOfWork _uow;
        public IMapper Mapper { get; }
        
        public PropertyController(IUnitOfWork uow,IMapper mapper){
            Mapper = mapper;
            _uow = uow;

        }
        
        [HttpGet("type/{SellRent}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertes(int SellRent){
            var PropertyList=await _uow.PropertyRepository.GetProperties(SellRent);
            var PropertyDTO=Mapper.Map<IEnumerable<PropertyDto>>(PropertyList);
            return Ok(PropertyDTO);
        }

        [HttpGet("detail/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyDetail(int id){
            var Property=await _uow.PropertyRepository.GetPropertyDetail(id);
            var PropertyDetailDTO=Mapper.Map<PropertyDetailDto>(Property);
            return Ok(PropertyDetailDTO);
        }

        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddProperty(AddPropertyDto prop){
        var Property= Mapper.Map<Property>(prop);
        var UserId=GetUserId();
        Property.PostedBy=UserId;
        Property.LastUpdatedBy=UserId;
        _uow.PropertyRepository.AddProperty(Property);
        await _uow.SaveAsync();   
        return StatusCode(201);

        }

    }
}