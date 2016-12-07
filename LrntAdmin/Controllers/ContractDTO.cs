
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
	public class ContractDTO
    {
		public System.Int32 Id { get; set; }
		public System.Boolean IsAccepted { get; set; }
		public System.Int32 Rate { get; set; }
		public System.String Description { get; set; }
		public System.Int32 Owner { get; set; }

        public static System.Linq.Expressions.Expression<Func< Contract,  ContractDTO>> SELECT =
            x => new  ContractDTO
            {
                Id = x.Id,
                IsAccepted = x.IsAccepted,
                Rate = x.Rate,
                Description = x.Description,
                Owner = x.Owner,
            };

	}
}