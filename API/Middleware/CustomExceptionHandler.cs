using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using API.Errors;
using Microsoft.Extensions.Hosting;

namespace API.Middleware
{
    public class CustomExceptionHandler
    {
        public RequestDelegate Next { get; }
        private readonly ILogger<CustomExceptionHandler> _logger;
        private readonly IHostEnvironment _env;
        public CustomExceptionHandler(RequestDelegate next,ILogger<CustomExceptionHandler> logger,IHostEnvironment env){
            _env = env;
            _logger = logger;
             Next = next;
        
        }

        public async Task Invoke(HttpContext context){
            try{

                await Next(context);

            }catch(Exception ex){
                ApiErrors response;
                HttpStatusCode StatusCode=HttpStatusCode.InternalServerError;
                string Message;
                var ExceptionType=ex.GetType();

                if(ExceptionType== typeof(UnauthorizedAccessException)){
                    StatusCode=HttpStatusCode.Forbidden;
                    Message="Your not authorized";
                }else{
                    StatusCode=HttpStatusCode.InternalServerError;
                    Message="Some unknown error occourd";
                }

                if(_env.IsDevelopment()){
                    response=new ApiErrors((int)StatusCode,ex.Message,ex.StackTrace.ToString());
                }else{
                    response=new ApiErrors((int)StatusCode,Message);
                }
                _logger.LogError(ex,ex.Message);
                context.Response.StatusCode=(int)StatusCode;
                context.Response.ContentType="application/json";
                await context.Response.WriteAsync(response.ToString());
            }
        }
    }
}