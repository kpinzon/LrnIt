
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using LrntModel;


namespace LrntModel
{
    public class UserController : ApiController
    {
        private LrntModel.LrntDatabaseContainer db = new LrntModel.LrntDatabaseContainer();

        public IQueryable<UserDTO> GetUsers()
        {
            var model = db.Users.AsQueryable();

            return model.Select(UserDTO.SELECT);
        }

        public IQueryable<UserDTO> GetUsers(int CategoryId
               )
        {
            var model = db.Users.Where(u => u.Tags.Any(t => t.CategoryId == CategoryId)).AsQueryable();

            return model.Select(UserDTO.SELECT);
        }

        public IQueryable<UserDTO> GetUsersWithTags(int TagId
               )
        {
            var model = db.Users.Where(u => u.Tags.Any(t => t.Id == TagId)).AsQueryable();

            return model.Select(UserDTO.SELECT);
        }

        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(string username, string password)
        {
            User user = db.Users.Where(u => u.Username == username && u.Password == password).FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [ResponseType(typeof(UserDTO))]
        public async Task<IHttpActionResult> GetUser(int id)
        {
            var model = await db.Users.Select(UserDTO.SELECT).FirstOrDefaultAsync(x => x.Id == id);
            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }


        public async Task<IHttpActionResult> PutUser(User model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            /* 1- Get existing data from database */
            var existingUser = db.Users.Include("Tags")
                    .Where(u => u.Id == model.Id).FirstOrDefault<User>();

            List<Tag> addedTags = new List<Tag>();

            for (int i=0; i < model.Tags.Count(); i++) 
            {
                bool found = false;
               

                for (int j=0; j < existingUser.Tags.Count(); j++)
                {
                    if (model.Tags.ToList()[i].Id == existingUser.Tags.ToList()[j].Id)
                    {
                        found = true;
                    }

                }

                if (found == false)
                {
                    addedTags.Add(model.Tags.ToList()[i]);
                }
            }

            List<Tag> deletedTags = new List<Tag>();

            for (int i = 0; i < existingUser.Tags.Count(); i++) 
            {
                bool found = false;


                for (int j = 0; j < model.Tags.Count(); j++)
                {
                    if (model.Tags.ToList()[j].Id == existingUser.Tags.ToList()[i].Id)
                    {
                        found = true;
                    }

                }

                if (found == false)
                {
                    deletedTags.Add(existingUser.Tags.ToList()[i]);
                }
            }

            deletedTags.ForEach(t => existingUser.Tags.Remove(t));

            //5- Add new courses
            foreach (Tag t in addedTags)
            {
                /*6- Attach courses because it came from client 
                as detached state in disconnected scenario*/
                if (db.Entry(t).State == EntityState.Detached)
                    db.Tags.Attach(t);

                //7- Add course in existing student's course collection
                existingUser.Tags.Add(t);
            }
            existingUser.Id = model.Id;
            existingUser.Bio = model.Bio;
            existingUser.Lname = model.Lname;
            existingUser.Fname = model.Fname;
            existingUser.Email = model.Email;
            existingUser.Phone = model.Phone;
            existingUser.Username = model.Username;
            existingUser.Password = model.Password;
            existingUser.Image = model.Image;
            existingUser.Headline = model.Headline;


            db.Entry(existingUser).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(model.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [ResponseType(typeof(UserDTO))]
        public async Task<IHttpActionResult> PostUser(User model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Users.Add(model);
            await db.SaveChangesAsync();
            var ret = await db.Users.Select(UserDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
            return CreatedAtRoute("DefaultApi", new { id = model.Id }, model);
        }

        [ResponseType(typeof(UserDTO))]
        public async Task<IHttpActionResult> DeleteUser(int id)
        {
            User model = await db.Users.FindAsync(id);
            if (model == null)
            {
                return NotFound();
            }

            db.Users.Remove(model);
            await db.SaveChangesAsync();
            var ret = await db.Users.Select(UserDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
            return Ok(ret);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }

       
    }

 
}