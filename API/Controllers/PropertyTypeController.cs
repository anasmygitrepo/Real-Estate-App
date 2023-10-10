using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

using API.Dto;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyTypeController : ControllerBase
    {
        
         
        public IUnitOfWork _Uow { get; }
        private readonly IMapper _mapper;

        public PropertyTypeController(IUnitOfWork Uow,IMapper mapper){
            _mapper = mapper;
            _Uow = Uow;

        }

        [HttpGet("propertytype")]
        public async Task<ActionResult<PropertyType>> GetPropertyType()
        {
            var PropertyTypes= await _Uow.PropertyTypeRepository.GetPropertyType();
            var Data =  _mapper.Map<IEnumerable<IdTextDto>>(PropertyTypes);
            return Ok(Data);
            return Ok(PropertyTypes);
        }
    }
}