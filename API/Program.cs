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

// Add services to the container.

    builder.Services.AddControllers().AddNewtonsoftJson();
    builder.Services.AddCors();

    builder.Services.AddScoped<IUnitOfWork,UnitOfWork>();


//User Authenticatiction validating..............
var secretkey =builder.Configuration.GetSection("Appsettings:Key").Value;
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
     builder.Configuration.GetConnectionString("DefaultConnection"));
    dbuilder.Password=builder.Configuration.GetSection("REAL-ESTATE-DB-PASSWORD").Value;
    var connectionstring=dbuilder.ConnectionString;
    builder.Services.AddDbContext<DataContext>(options => {
    options.UseSqlServer(connectionstring);

});


var app = builder.Build();

// Configure the HTTP request pipeline.


// app.ConfigureExceptionHandler(app.Environment);
app.UseMiddleware<CustomExceptionHandler>();

app.UseCors(m=>m.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

app.UseHttpsRedirection();
 app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

