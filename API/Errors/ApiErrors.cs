using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Errors
{


    public class ApiErrors
    {
        public ApiErrors(){}
        public ApiErrors(int errorCode,string errormessage,string errordetails= null){
            ErrorCode=errorCode;
            ErrorMessage=errormessage;
            ErrorDetails=errordetails;
        }

        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
        public string ErrorDetails { get; set; }

        public override string ToString(){
            var options=new JsonSerializerOptions(){
                PropertyNamingPolicy=JsonNamingPolicy.CamelCase
            };
            return JsonSerializer.Serialize(this,options);
        }
    }

}