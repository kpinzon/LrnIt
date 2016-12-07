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
    public class UserController : ApiController
    {

        [ResponseType(typeof(List<User>))]
        public IHttpActionResult Get()
        {
            var client = new WebClient();
            var response =
                client.DownloadString("http://localhost:51604/Api/User/");

            List<User> responseObject = JsonConvert.DeserializeObject<List<User>>(response);
            return Ok(responseObject);
        }

        public IHttpActionResult Post(User user)
        {
            var client = new WebClient();
            client.Headers.Add("Content-Type", "application/json");
            var response = client.UploadString("http://localhost:51604/Api/User/", "POST", JsonConvert.SerializeObject(user));



            return Ok();
        }

        public IHttpActionResult Get(int CategoryId)
        {
            var client = new WebClient();
            client.Headers.Add("Content-Type", "application/json;odata=fullmetadata");
            var response =
                client.DownloadString("http://localhost:51604/Api/User/?CategoryId=" + CategoryId);

            List<User> responseObject = JsonConvert.DeserializeObject<List<User>>(response);
            return Ok(responseObject);
        }

        public IHttpActionResult GetUsersByTag(int TagId)
        {
            var client = new WebClient();
            client.Headers.Add("Content-Type", "application/json;odata=fullmetadata");
            var response =
                client.DownloadString("http://localhost:51604/Api/User/?TagId=" + TagId);

            List<User> responseObject = JsonConvert.DeserializeObject<List<User>>(response);
            return Ok(responseObject);
        }


        public IHttpActionResult Get(string username, string password)
        {
            var client = new WebClient();
            var response = "";
            try
            {
                response =
               client.DownloadString("http://localhost:51604/Api/User/?username=" + username + "&password=" + password);

            }
            catch
            {
                return NotFound();
            }
           
            User responseObject = JsonConvert.DeserializeObject<User>(response);
            return Ok(responseObject);
        }

        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int ProfileId)
        {
            var client = new WebClient();
            var response =
                client.DownloadString("http://localhost:51604/Api/User/" + ProfileId);

            User responseObject = JsonConvert.DeserializeObject<User>(response);
            return Ok(responseObject);
        }

        public IHttpActionResult PutUser(User user)
        {
            var client = new WebClient();
            client.Headers.Add("Content-Type", "application/json");

            User temp = new LrntModel.User();
            temp.Id = user.Id;
            temp.Bio = user.Bio;
            temp.Lname = user.Lname;
            temp.Fname = user.Fname;
            temp.Email = user.Email;
            temp.Phone = user.Phone;
            temp.Username = user.Username;
            temp.Password = user.Password;
            temp.Image = user.Image;
            temp.Headline = user.Headline;

            //

            foreach (LrntModel.Tag t in user.Tags)
            {
                temp.Tags.Add(new LrntModel.Tag {
                       Id = t.Id,
                       Name = t.Name,
                       CategoryId = t.CategoryId
                } );
            }

            string request = JsonConvert.SerializeObject(temp);
            var response = client.UploadString("http://localhost:51604/Api/User", "PUT", request);

            return Ok(response);
        }


    }

    

   
}