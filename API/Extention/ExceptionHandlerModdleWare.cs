using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Diagnostics;

namespace API.Extention
{
    public static class ExceptionHandlerModdleWare
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app,IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }else{
                app.UseExceptionHandler(
                options=>{
                options.Run(
                async context=>{
                    context.Response.StatusCode=(int)HttpStatusCode.InternalServerError;
                    var ex= context.Features.Get<IExceptionHandlerFeature>();
                    if(ex!=null){
                        await context.Response.WriteAsJsonAsync(ex.Error.Message);
                    }
                }
            );
        }
    );
}
        }
    }}