using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Filters;

namespace Raffles.API.Filter
{
    public class GlobalExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            if (context.Response == null)
            {
                context.Response = context.Request.CreateErrorResponse(HttpStatusCode.InternalServerError, context.Exception);
            }

            //context.Response.Headers.Add("Application-Error", context.Exception.ToString());
            //context.Response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            //context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
        }
    }
}