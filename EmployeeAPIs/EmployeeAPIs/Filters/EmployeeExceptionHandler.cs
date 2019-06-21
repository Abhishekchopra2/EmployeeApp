using System.Net.Http;
using System.Web.Http.Filters;

namespace EmployeeAPIs.Filters
{
    public class EmployeeExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            // We can log exception message using actionExecutedContext.Exception.Message
            var response = new HttpResponseMessage(System.Net.HttpStatusCode.InternalServerError)
            {
                Content = new StringContent("Something went wrong, please contact your administrator")
            };
            actionExecutedContext.Response = response;
        }
    }
}