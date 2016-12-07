using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using LrntModel;
using System.Web.Http;
using System.Web.Http.Description;
using Newtonsoft.Json;

namespace LrnItFront.Controllers
{
    public class ExpertiseController : ApiController
    {
        public IHttpActionResult Get(int UserId)
        {
            var client = new WebClient();
            var response =
                client.DownloadString("http://localhost:51604/Api/Expertise?UserId=" + UserId);

            List<Expertise> responseObject = JsonConvert.DeserializeObject<List<Expertise>>(response);
            return Ok(responseObject);
        }

        public IHttpActionResult Post(Expertise expertise)
        {
            var client = new WebClient();
            client.Headers.Add("Content-Type", "application/json");
            
            var response = client.UploadString("http://localhost:51604/Api/Expertise/", "POST", JsonConvert.SerializeObject(expertise));
            return Ok(response);
        }

        public IHttpActionResult Delete(int id,Expertise expertise)
        {
            var client = new WebClient();
            client.Headers.Add("Content-Type", "application/json");

            var response = client.UploadString("http://localhost:51604/Api/Expertise/" + id, "DELETE", JsonConvert.SerializeObject(expertise));
            return Ok(response);
        }

        public IHttpActionResult Put(int id,Expertise expertise)
        {
            var client = new WebClient();
            client.Headers.Add("Content-Type", "application/json");
            var response = client.UploadString("http://localhost:51604/Api/Expertise/" + id, "PUT", JsonConvert.SerializeObject(expertise));

            return Ok(response);
        }
    }
}
