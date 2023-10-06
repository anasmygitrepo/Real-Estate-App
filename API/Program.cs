using System.Net;
using System.Text;
using API.Data;
using API.Data.Interfaces;
using API.Data.Repositories;
using API.Extention;
using API.Helpers;
using API.Interfaces;
using API.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
var myAllowspecificOrigins = "_myAllowspecificOrigins";
// Add services to the container.

    builder.Services.AddControllers().AddNewtonsoftJson();
    builder.Services.AddCors();

    builder.Services.AddScoped<IUnitOfWork,UnitOfWork>();

    builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowspecificOrigins, builder =>
    {
        builder.WithOrigins("http://localhost:4200")
        .AllowAnyMethod().
        AllowAnyHeader();
    });
});


//User Authenticatiction validating..............
var secretkey =builder.Configuration.GetSection("AppSettings:Key").Value;
    var key=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretkey));
    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(opt=>{
            opt.TokenValidationParameters=new TokenValidationParameters
            {
                ValidateIssuerSigningKey=true,
                ValidateIssuer=false,
                ValidateAudience=false,
                IssuerSigningKey=key
            };
        }); 


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(AutoMapperProfils).Assembly);


//Mking database connection using environmet saved password "REAL-ESTATE-DB-PASSWORD"
var dbuilder= new SqlConnectionStringBuilder(
     builder.Configuration.GetConnectionString("Default"));
    dbuilder.Password=builder.Configuration.GetSection("REAL_ESTATE_DB_PASSWORD").Value;
    var connectionstring=dbuilder.ConnectionString;
    builder.Services.AddDbContext<DataContext>(options => {
    options.UseSqlServer(connectionstring);

});


var app = builder.Build();

  

// Configure the HTTP request pipeline.


// app.ConfigureExceptionHandler(app.Environment);
app.UseMiddleware<CustomExceptionHandler>();

// app.UseHsts();
// app.UseHttpsRedirection();

app.UseCors(m=>m.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());


 app.UseAuthentication();

app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();

app.Run();

