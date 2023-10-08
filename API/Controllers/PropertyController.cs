using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            var Property=await _uow.PropertyRepository.GetProperties(SellRent);
            var PropertyDTO=Mapper.Map<IEnumerable<PropertyDto>>(Property);
            return Ok(PropertyDTO);
        }

    }
}