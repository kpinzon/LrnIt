using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using System.Web.Http.Description;
using LrntModel;

namespace LrnItFront.Controllers
{
    public class CategoryController : ApiController
    {
        public IHttpActionResult Get()
        {
            var client = new WebClient();
            client.Headers.Add("Content-Type", "application/json;odata=fullmetadata");
            var response = client.DownloadString("http://localhost:51604/Api/Category");

            List<Category> responseObject = JsonConvert.DeserializeObject<List<Category>>(response);
            return Ok(responseObject);

        }
    }

    


}
