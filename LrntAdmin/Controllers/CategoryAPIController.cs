
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
    public class CategoryController : ApiController
    {
        private LrntModel.LrntDatabaseContainer db = new LrntModel.LrntDatabaseContainer();


        public IQueryable<CategoryDTO> GetCategories(int pageSize = 10
                )
        {
            var model = db.Categories.AsQueryable();
                        
            return model.Select(CategoryDTO.SELECT).Take(pageSize);
        }

        [ResponseType(typeof(CategoryDTO))]
        public async Task<IHttpActionResult> GetCategory(int id)
        {
            var model = await db.Categories.Select(CategoryDTO.SELECT).FirstOrDefaultAsync(x => x.Id == id);
            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        public async Task<IHttpActionResult> PutCategory(int id, Category model)
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
                if (!CategoryExists(id))
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

        [ResponseType(typeof(CategoryDTO))]
        public async Task<IHttpActionResult> PostCategory(Category model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Categories.Add(model);
            await db.SaveChangesAsync();
            var ret = await db.Categories.Select(CategoryDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
            return CreatedAtRoute("DefaultApi", new { id = model.Id }, model);
        }

        [ResponseType(typeof(CategoryDTO))]
        public async Task<IHttpActionResult> DeleteCategory(int id)
        {
            Category model = await db.Categories.FindAsync(id);
            if (model == null)
            {
                return NotFound();
            }

            db.Categories.Remove(model);
            await db.SaveChangesAsync();
            var ret = await db.Categories.Select(CategoryDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
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

        private bool CategoryExists(int id)
        {
            return db.Categories.Count(e => e.Id == id) > 0;
        }
    }
}