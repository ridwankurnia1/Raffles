using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Raffles.API.Filter
{
    public class ValidationActionFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var modelState = actionContext.ModelState;
            if (!modelState.IsValid)
            {
                actionContext.Response = actionContext.Request.CreateErrorResponse(HttpStatusCode.BadRequest, modelState);
                actionContext.Response.Headers.Add("Application-Error", "Bad Request");
                actionContext.Response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
                actionContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            }
        }

        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {   
            if (actionExecutedContext.Request.Properties.ContainsKey("Pagination"))
            {
                var paginationHeader = actionExecutedContext.Request.Properties["Pagination"];
                actionExecutedContext.Response.Content.Headers.Add("Pagination", paginationHeader.ToString());
                actionExecutedContext.Response.Content.Headers.Add("Access-Control-Expose-Headers", "Pagination");
            }
        }
    }
}