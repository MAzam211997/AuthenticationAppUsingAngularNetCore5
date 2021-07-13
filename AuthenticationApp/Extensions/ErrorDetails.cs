using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace AuthenticationApp.Extensions
{
    public class ErrorDetails
    {
        public int StatusCode { get; set; }
        public String Message { get; set; }
        public override string ToString() => JsonConvert.SerializeObject(this);
    }
}
