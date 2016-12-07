
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
    public class MessageController : ApiController
    {
        private LrntModel.LrntDatabaseContainer db = new LrntModel.LrntDatabaseContainer();

        public IQueryable<MessageDTO> GetMessages(int pageSize = 10
                        ,System.Int32? ConversationId = null
                        ,System.Int32? UserId = null
                )
        {
            var model = db.Messages.AsQueryable();
                                if(ConversationId != null){
                        model = model.Where(m=> m.ConversationId == ConversationId.Value);
                    }
                                if(UserId != null){
                        model = model.Where(m=> m.UserId == UserId.Value);
                    }
                        
            return model.Select(MessageDTO.SELECT).Take(pageSize);
        }

        [ResponseType(typeof(MessageDTO))]
        public async Task<IHttpActionResult> GetMessage(int id)
        {
            var model = await db.Messages.Select(MessageDTO.SELECT).FirstOrDefaultAsync(x => x.Id == id);
            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        public async Task<IHttpActionResult> PutMessage(Message model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            db.Entry(model).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MessageExists(model.Id))
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

        [ResponseType(typeof(MessageDTO))]
        public async Task<IHttpActionResult> PostMessage(Message model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Messages.Add(model);
            await db.SaveChangesAsync();
            var ret = await db.Messages.Select(MessageDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
            return CreatedAtRoute("DefaultApi", new { id = model.Id }, model);
        }

        [ResponseType(typeof(MessageDTO))]
        public async Task<IHttpActionResult> DeleteMessage(int id)
        {
            Message model = await db.Messages.FindAsync(id);
            if (model == null)
            {
                return NotFound();
            }

            db.Messages.Remove(model);
            await db.SaveChangesAsync();
            var ret = await db.Messages.Select(MessageDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
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

        private bool MessageExists(int id)
        {
            return db.Messages.Count(e => e.Id == id) > 0;
        }
    }
}