
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

namespace LrntModel
{
    public class ConversationController : ApiController
    {
        private LrntModel.LrntDatabaseContainer db = new LrntModel.LrntDatabaseContainer();

        public IQueryable<ConversationDTO> GetConversations(int pageSize = 10
                )
        {
            var model = db.Conversations.AsQueryable();
                        
            return model.Select(ConversationDTO.SELECT).Take(pageSize);
        }

        [ResponseType(typeof(ConversationDTO))]
        public async Task<IHttpActionResult> GetConversation(int id)
        {
            var model = await db.Conversations.Select(ConversationDTO.SELECT).FirstOrDefaultAsync(x => x.Id == id);
            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        public IQueryable<ConversationDTO> GetConversationsForSender(int senderId)
        {
            var model = db.Conversations.Where(c => c.SenderId == senderId).AsQueryable();
            return model.Select(ConversationDTO.SELECT);
        }

        public IQueryable<ConversationDTO> GetConversationsForRecipient(int recipientId)
        {
            var model = db.Conversations.Where(c => c.RecipientId == recipientId).AsQueryable();
            return model.Select(ConversationDTO.SELECT);
        }

        public async Task<IHttpActionResult> PutConversation(int id, Conversation model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != model.Id)
            {
                return BadRequest();
            }

            db.Entry(model).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConversationExists(id))
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

        [ResponseType(typeof(ConversationDTO))]
        public IHttpActionResult PostConversation(Conversation model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tempUsers = new List<User>();

            if (model.Users != null)
            {
                for (var i = 0; i < model.Users.Count; i++)
                {
                    tempUsers.Add(model.Users.ToList()[i]);
                }

                model.Users.Clear();
            }

            foreach (User user in tempUsers)
            {
                model.Users.Add(db.Users.FirstOrDefault(u => u.Id == user.Id));
            }

            db.Conversations.Add(model);

            db.SaveChanges();
            // db.Conversations.Select(ConversationDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
            return CreatedAtRoute("DefaultApi", new { id = model.Id }, model);
        }

        [ResponseType(typeof(ConversationDTO))]
        public async Task<IHttpActionResult> DeleteConversation(int id)
        {
            Conversation model = await db.Conversations.FindAsync(id);
            if (model == null)
            {
                return NotFound();
            }

            db.Conversations.Remove(model);
            await db.SaveChangesAsync();
            var ret = await db.Conversations.Select(ConversationDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
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

        private bool ConversationExists(int id)
        {
            return db.Conversations.Count(e => e.Id == id) > 0;
        }
    }
}