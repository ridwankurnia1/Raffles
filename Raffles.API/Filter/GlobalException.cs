using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace Raffles.API.Filter
{
    public class GlobalException : Exception
    {        
        public GlobalException(HttpStatusCode statusCode, string errorCode, string errorDescription) : base($"{errorCode}::{errorDescription}")
        {
            StatusCode = statusCode;
        }

        public GlobalException(HttpStatusCode statusCode)
        {
            StatusCode = statusCode;
        }

        public HttpStatusCode StatusCode { get; }
    }
}