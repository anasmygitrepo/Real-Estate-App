using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet.Actions;

namespace API.Interfaces
{
    public interface IphotoService
    {
        Task <ImageUploadResult> UpLoadPhoto(IFormFile Photo);
        Task<DeletionResult> DeletPhotoResult(string PublicId);
    }
}