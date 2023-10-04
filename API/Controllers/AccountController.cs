using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Data.Repositories;
using API.Dto;
using API.Interfaces;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{

    public class AccountController : BaseController
    {
        public IMapper _Mapper { get; }
        private readonly IUnitOfWork _Uow;
        private readonly IConfiguration _configuration;
        public AccountController(IUnitOfWork Uow,IMapper mapper,IConfiguration configuration)
        {
            _configuration = configuration;
            _Mapper = mapper;
            _Uow = Uow;

        }

        [HttpPost("register")]
        public async Task<IActionResult> UserRegister (LoginDto LonginReq)
        {
            if(await _Uow.UserRepository.UserAlreadyExists(LonginReq.Username)){
                return BadRequest("user already exisit try another one");
            }
            _Uow.UserRepository.Register(LonginReq.Username,LonginReq.Password);
            await _Uow.SaveAsync();

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> UserLogin (LoginDto LonginReq)
        {
            var user =await _Uow.UserRepository.Authenticate(LonginReq.Username,LonginReq.Password);
        
            if(user==null){
                return Unauthorized();
            }

            var LoginRes=new LoginResponseDto();
            LoginRes.UserName=user.Username;
            LoginRes.Token=CreaetJWT(user);
            return Ok(LoginRes);
        }

        public string CreaetJWT(User user){
                
            var secretkey=_configuration.GetSection("Appsettings:Key").Value;
            var key=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretkey));
            var claims=new Claim[]
                {
                    new Claim(ClaimTypes.Name,user.Username),
                    new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())
                };

            var sigininCredentials=new SigningCredentials(
                key,SecurityAlgorithms.HmacSha256Signature);
            var TokenDescriptor=new SecurityTokenDescriptor
                {
                    Subject=new ClaimsIdentity(claims),
                    Expires=DateTime.UtcNow.AddDays(5),
                    SigningCredentials=sigininCredentials
                };

            var tokenHandeler=new JwtSecurityTokenHandler();
            var Token =tokenHandeler.CreateToken(TokenDescriptor);
            return tokenHandeler.WriteToken(Token);


        }


    }
}