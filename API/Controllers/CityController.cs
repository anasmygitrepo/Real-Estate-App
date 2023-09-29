using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CityController : ControllerBase
    {
        [HttpGet("")]
        public IEnumerable <string> GetStrings(){
            return new string[]{"india","us","america"};
        }
    }
}