
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
    public class TagController : ApiController
    {
        private LrntModel.LrntDatabaseContainer db = new LrntModel.LrntDatabaseContainer();

        public IQueryable<TagDTO> GetTags(int pageSize = 10
                        ,System.Int32? CategoryId = null
                )
        {
            var model = db.Tags.AsQueryable();
                                if(CategoryId != null){
                        model = model.Where(m=> m.CategoryId == CategoryId.Value);
                    }
                        
            return model.Select(TagDTO.SELECT).Take(pageSize);
        }

        [ResponseType(typeof(TagDTO))]
        public async Task<IHttpActionResult> GetTag(int id)
        {
            var model = await db.Tags.Select(TagDTO.SELECT).FirstOrDefaultAsync(x => x.Id == id);
            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        public IQueryable<TagDTO> GetTagsForUser(int UserId)
        {
            var model = db.Tags.Where(t => t.Users.Any(u => u.Id == UserId)).AsQueryable();
            return model.Select(TagDTO.SELECT);
        }

        public IQueryable<TagDTO> GetTagsForCategory(int CategoryId)
        {
            var model = db.Tags.Where(t => t.CategoryId == CategoryId).AsQueryable();
            return model.Select(TagDTO.SELECT);
        }


        public async Task<IHttpActionResult> PutTag(int id, Tag model)
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
                if (!TagExists(id))
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

        [ResponseType(typeof(TagDTO))]
        public async Task<IHttpActionResult> PostTag(Tag model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Tags.Add(model);
            await db.SaveChangesAsync();
            var ret = await db.Tags.Select(TagDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
            return CreatedAtRoute("DefaultApi", new { id = model.Id }, model);
        }

        [ResponseType(typeof(TagDTO))]
        public async Task<IHttpActionResult> DeleteTag(int id)
        {
            Tag model = await db.Tags.FindAsync(id);
            if (model == null)
            {
                return NotFound();
            }

            db.Tags.Remove(model);
            await db.SaveChangesAsync();
            var ret = await db.Tags.Select(TagDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
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

        private bool TagExists(int id)
        {
            return db.Tags.Count(e => e.Id == id) > 0;
        }
    }
}