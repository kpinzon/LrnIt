
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
    public class ExpertiseController : ApiController
    {
        private LrntModel.LrntDatabaseContainer db = new LrntModel.LrntDatabaseContainer();

        public IQueryable<ExpertiseDTO> GetExpertises(int pageSize = 10
                        ,System.Int32? UserId = null
                )
        {
            var model = db.Expertises.AsQueryable();
                                if(UserId != null){
                        model = model.Where(m=> m.UserId == UserId.Value);
                    }
                        
            return model.Select(ExpertiseDTO.SELECT).Take(pageSize);
        }

        [ResponseType(typeof(ExpertiseDTO))]
        public async Task<IHttpActionResult> GetExpertise(int id)
        {
            var model = await db.Expertises.Select(ExpertiseDTO.SELECT).FirstOrDefaultAsync(x => x.Id == id);
            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        public async Task<IHttpActionResult> PutExpertise(Expertise model)
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
                if (!ExpertiseExists(model.Id))
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

        [ResponseType(typeof(ExpertiseDTO))]
        public async Task<IHttpActionResult> PostExpertise(Expertise model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Expertises.Add(model);
            await db.SaveChangesAsync();
            var ret = await db.Expertises.Select(ExpertiseDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
            return CreatedAtRoute("DefaultApi", new { id = model.Id }, model);
        }

        [ResponseType(typeof(ExpertiseDTO))]
        public async Task<IHttpActionResult> DeleteExpertise(int id)
        {
            Expertise model = await db.Expertises.FindAsync(id);
            if (model == null)
            {
                return NotFound();
            }

            db.Expertises.Remove(model);
            await db.SaveChangesAsync();
            var ret = await db.Expertises.Select(ExpertiseDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
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

        private bool ExpertiseExists(int id)
        {
            return db.Expertises.Count(e => e.Id == id) > 0;
        }
    }
}