
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
    public class ContractController : ApiController
    {
        private LrntModel.LrntDatabaseContainer db = new LrntModel.LrntDatabaseContainer();

        public IQueryable<ContractDTO> GetContracts(int pageSize = 10
                )
        {
            var model = db.Contracts.AsQueryable();
                        
            return model.Select(ContractDTO.SELECT).Take(pageSize);
        }

        [ResponseType(typeof(ContractDTO))]
        public async Task<IHttpActionResult> GetContract(int id)
        {
            var model = await db.Contracts.Select(ContractDTO.SELECT).FirstOrDefaultAsync(x => x.Id == id);
            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        public async Task<IHttpActionResult> PutContract(int id, Contract model)
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
                if (!ContractExists(id))
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

        [ResponseType(typeof(ContractDTO))]
        public async Task<IHttpActionResult> PostContract(Contract model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Contracts.Add(model);
            await db.SaveChangesAsync();
            var ret = await db.Contracts.Select(ContractDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
            return CreatedAtRoute("DefaultApi", new { id = model.Id }, model);
        }

        [ResponseType(typeof(ContractDTO))]
        public async Task<IHttpActionResult> DeleteContract(int id)
        {
            Contract model = await db.Contracts.FindAsync(id);
            if (model == null)
            {
                return NotFound();
            }

            db.Contracts.Remove(model);
            await db.SaveChangesAsync();
            var ret = await db.Contracts.Select(ContractDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
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

        private bool ContractExists(int id)
        {
            return db.Contracts.Count(e => e.Id == id) > 0;
        }
    }
}