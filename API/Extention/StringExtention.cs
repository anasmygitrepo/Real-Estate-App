using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extention
{
    public static class StringExtention
    {
        public static bool IsEmpty(this string text){
            return string.IsNullOrEmpty(text.Trim());
        }
    }
}