using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace API.Service
{
    public class PhotoService : IphotoService
    {
        private readonly Cloudinary cloudinary;
        public PhotoService(IConfiguration config){
             Account account = new Account(
                config.GetSection("ClodinarySettings:CloudName").Value,
                config.GetSection("ClodinarySettings:ASPNETCORE_ClodinarySettings__ApiKey").Value,
                config.GetSection("ClodinarySettings:ASPNETCORE_ClodinarySettings__ApiSecret").Value);

                
                
         cloudinary = new Cloudinary(account);
        }
        public async Task<ImageUploadResult> UpLoadPhoto(IFormFile Photo)
        {
            var UplodResult=new ImageUploadResult();
            if(Photo.Length>0){
                using var stream=Photo.OpenReadStream();
                var UploadParams=new ImageUploadParams
                {
                    File=new FileDescription(Photo.FileName,stream),
                    Transformation=new Transformation()
                    .Height(500).Width(800)
                };
                UplodResult= await cloudinary.UploadAsync(UploadParams);
            }
            return UplodResult;
       

        }
    }
}