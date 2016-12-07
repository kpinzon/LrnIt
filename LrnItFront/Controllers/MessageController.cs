using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using LrntModel;
using Newtonsoft.Json;

namespace LrnItFront.Controllers
{
    public class MessageController : ApiController
    {
        public IHttpActionResult Post (Message message)
        {
            var client = new WebClient();
            client.Headers.Add("Content-Type", "application/json");
            message.TimeSent = DateTime.Now;

            var response = client.UploadString("http://localhost:51604/Api/Message/", "POST", JsonConvert.SerializeObject(message));
            return Ok(response);
        }

        public IHttpActionResult PutMessageToTRead (Message message)
        {
            var client = new WebClient();
            client.Headers.Add("Content-Type", "application/json");
            var response = client.UploadString("http://localhost:51604/Api/Message", "PUT", JsonConvert.SerializeObject(message));
           
            return Ok(response);
        }
    }

    
}
