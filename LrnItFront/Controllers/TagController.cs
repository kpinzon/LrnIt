using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using System.Web.Http.Description;

namespace LrnItFront.Controllers
{
    public class TagController : ApiController
    {
        public IHttpActionResult Get()
        {
            var client = new WebClient();
            var response =
                client.DownloadString("http://localhost:51604/Api/Tag");

            List<Tag> responseObject = JsonConvert.DeserializeObject<List<Tag>>(response);
            return Ok(responseObject);
        }

        public IHttpActionResult Get(int UserId)
        {
            var client = new WebClient();
            var response =
                client.DownloadString("http://localhost:51604/Api/Tag?UserId=" + UserId);

            List<Tag> responseObject = JsonConvert.DeserializeObject<List<Tag>>(response);
            return Ok(responseObject);
        }

        public IHttpActionResult GetTagsForCategoy(int CategoryId)
        {
            var client = new WebClient();
            var response =
                client.DownloadString("http://localhost:51604/Api/Tag?CategoryId=" + CategoryId);

            List<Tag> responseObject = JsonConvert.DeserializeObject<List<Tag>>(response);
            return Ok(responseObject);
        }
    }

    public class Tag
    {
       
        public int Id { get; set; }
        public string Name{ get; set; }
        public int CategoryId { get; set; }
    }

    public class TagResponse
    {
        public List<Tag> Tags { get; set; }
    }
}
