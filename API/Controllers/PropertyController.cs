
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
        private readonly IphotoService _photoservice;
        
        public PropertyController(IUnitOfWork uow,IMapper mapper,IphotoService photoservice){
            _photoservice = photoservice;
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

        
        [HttpPost("add/photo/{propid}")]
        [Authorize]
        public async Task<IActionResult> AddPropertyPhoto(IFormFile Photo,int propid){

            var result =await _photoservice.UpLoadPhoto(Photo);
            if(result.Error!=null)
            {
                return BadRequest(result.Error.Message);   
            }

            var property=await  _uow.PropertyRepository.GetSingleProperty(propid);
            
            var photo= new Photo
            {
                ImageUrl  = result.SecureUri.AbsoluteUri,
                PublicId = result.PublicId
            };
            if(property.Photos.Count==0)
            {
                photo.IsPrimary=true;
            }
            property.Photos.Add(photo);
            await _uow.SaveAsync();
            return StatusCode(201);
        }

        [HttpPost("set-primary-photo/{propid}/{photopublicId}")]
        [Authorize]
        public async Task<IActionResult> SetPrimaryPhoto(int propid,string photopublicId)
        {
            var userId= GetUserId();
            var property=await _uow.PropertyRepository.GetSingleProperty(propid);
            if(property==null){
                return BadRequest("No such property or photo exists");
            }
            if(property.PostedBy!=userId){
                return BadRequest("You are not authorized to change the photo");
            }
            var photo=property.Photos.FirstOrDefault(x=>x.PublicId==photopublicId);

            if(photo==null){
                return BadRequest("No such property or photo exists");
            }
            if(photo.IsPrimary){
                return BadRequest("This photo is already a priamary photo");
            }

            var currentprimary= property.Photos.FirstOrDefault(p=>p.IsPrimary);
            if(currentprimary!=null)currentprimary.IsPrimary=false;
            photo.IsPrimary=true;

            if(await _uow.SaveAsync())return NoContent();
            return BadRequest("Some error are occurd,failed to set primary photo");

        }

        [HttpDelete("delete-photo/{propid}/{photopublicId}")]
        [Authorize]
        public async Task<IActionResult> DeletePhoto(int propid,string photopublicId)
        {
            var userId= GetUserId();
            var property=await _uow.PropertyRepository.GetSingleProperty(propid);
            if(property==null){
                return BadRequest("No such property or photo exists");
            }
            if(property.PostedBy!=userId){
                return BadRequest("You are not authorized to delete the photo");
            }
            var photo=property.Photos.FirstOrDefault(x=>x.PublicId==photopublicId);

            if(photo==null){
                return BadRequest("No such property or photo exists");
            }
            if(photo.IsPrimary)return BadRequest("You canot delete primary photo");

            var result= await _photoservice.DeletPhotoResult(photo.PublicId);
            
            if(result.Error!=null)return BadRequest(result.Error.Message);

            property.Photos.Remove(photo);

            if(await _uow.SaveAsync())return Ok();
            return BadRequest("Some error are occurd,failed to delete photo");

        }
    }
}