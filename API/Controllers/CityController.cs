

using API.Dto;
using API.Interfaces;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [Authorize]
    public class CityController : BaseController
    {
      
        private readonly IUnitOfWork Uow;
        private readonly IMapper mapper;
        
        public CityController(IUnitOfWork _uow,IMapper _mapper){
            mapper = _mapper;
            Uow = _uow;
        }
          
        // [HttpGet("")]
        // public IEnumerable <string> GetStrings(){
        //     return new string[]{"india","us","america"};[]
        // }

        //Get ALL Cities..........................
        [HttpGet("cities")]
        [AllowAnonymous]
        public async Task <IActionResult> GetCities()
        {
            var cities= await Uow.CityRepository.GetCiteies();
            var CityDto=mapper.Map<IEnumerable<CityDto>>(cities);
          
            return Ok(CityDto);
        }

        
       
        //Add cities................................
        [HttpPost("add-city")]
         [HttpPost("post")]
        //  [HttpPost("add-city/{cityname}")]
        public async Task <ActionResult> AddCity(CityDto DtoCity)
        {


            var city=mapper.Map<City>(DtoCity);
            city.LastUpdatedBy=1;
            city.LastUpdatedOn=DateTime.Now;
            Uow.CityRepository.AddCity(city);
            await Uow.SaveAsync();
            return StatusCode(200);


        }

        //updating a city 
         [HttpPut("update/{id}")]
        //  [HttpPost("add-city/{cityname}")]
        public async Task <ActionResult> UpdateCity(int id,CityDto Dto)
        {
            
            if(id!=Dto.Id){
                return BadRequest("Updation not allowed");
            }
            var UpdatingCity=await Uow.CityRepository.FindCity(id);

            if(UpdatingCity==null){
                return BadRequest("Upadation not allowed");
            }
            UpdatingCity.LastUpdatedBy=1;
            UpdatingCity.LastUpdatedOn=DateTime.Now;
            mapper.Map(Dto,UpdatingCity);
            await Uow.SaveAsync();
            return StatusCode(200);
           
           


        }

        //updating a purticular field in a city table
        [HttpPut("updatecityName/{id}")]
        //  [HttpPost("add-city/{cityname}")]
        public async Task <ActionResult> UpdateCityName(int id,CityUpdateDto Dto)
        {
            var UpdatingCity=await Uow.CityRepository.FindCity(id);
            UpdatingCity.LastUpdatedBy=1;
            UpdatingCity.LastUpdatedOn=DateTime.Now;
            mapper.Map(Dto,UpdatingCity);
            await Uow.SaveAsync();
            return StatusCode(200);


        }

            // [
            //      {"Name":"New York","path":"/Name","value":"Delhi"} frome post man
            // ]
          [HttpPatch("update/{id}")]
        //  [HttpPost("add-city/{cityname}")]
        public async Task<ActionResult> UpdateCityPatch(int id, JsonPatchDocument <City> PatchDto)
        {
            var UpdatingCity=await Uow.CityRepository.FindCity(id);
            UpdatingCity.LastUpdatedBy=1;
            UpdatingCity.LastUpdatedOn=DateTime.Now;
            PatchDto.ApplyTo(UpdatingCity,ModelState);
            await Uow.SaveAsync();
            return StatusCode(200);


        }

        [HttpDelete("delete/{id}")]
        public async Task <IActionResult> DeleteCity(int id)
        {
            Uow.CityRepository.DeleteCity(id);
            await Uow.SaveAsync();
            return Ok(id);
        }
    }
}