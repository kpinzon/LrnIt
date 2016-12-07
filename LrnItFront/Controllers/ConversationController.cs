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
    public class ConversationController : ApiController
    {
        public IHttpActionResult Post (Conversation conversation)
        {
            var client = new WebClient();
            client.Headers.Add("Content-Type", "application/json");
            conversation.TimeCreated = DateTime.Now;

            var response = client.UploadString("http://localhost:51604/Api/Conversation/", "POST", JsonConvert.SerializeObject(conversation));
            var responseObject = JsonConvert.DeserializeObject(response);

            return Ok(responseObject);
        
            
        }

        public IHttpActionResult GetConvoForRecipient(int recipientId)
        {
            var client = new WebClient();
            var response =
                client.DownloadString("http://localhost:51604/Api/Conversation?recipientId=" + recipientId);

            var responseObject = JsonConvert.DeserializeObject(response);

            return Ok(responseObject);
        }

        public IHttpActionResult GetConvoForSender(int senderId)
        {
            var client = new WebClient();
            var response =
                client.DownloadString("http://localhost:51604/Api/Conversation?senderId=" + senderId);

            var responseObject = JsonConvert.DeserializeObject(response);

            return Ok(responseObject);
        }
    }

    

}
