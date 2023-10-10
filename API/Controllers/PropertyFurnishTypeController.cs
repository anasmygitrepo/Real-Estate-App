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
    public class PropertyFurnishTypeController : BaseController
    {
        
        private readonly IUnitOfWork _Uow;
        public IMapper Mapper { get; }

        public PropertyFurnishTypeController(IUnitOfWork Uow,IMapper mapper){
            Mapper = mapper;
            
            _Uow = Uow;

        }

        [HttpGet("furnishtype")]
        public async Task<ActionResult<FurnishingType>> GetFurnishingTypoee()
        {
            var FurnishTypes= await _Uow.PropertyFurnishingTypeRepository.GetFurnisingType();
            var Data =  Mapper.Map<IEnumerable<IdTextDto>>(FurnishTypes);
            return Ok(Data);
        }


        
    }
}