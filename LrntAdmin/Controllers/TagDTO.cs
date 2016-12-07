
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
	public class TagDTO
    {
		public System.Int32 Id { get; set; }
		public System.String Name { get; set; }
		public System.Int32 CategoryId { get; set; }
		public string Category_Name { get; set; }

        public static System.Linq.Expressions.Expression<Func< Tag,  TagDTO>> SELECT =
            x => new  TagDTO
            {
                Id = x.Id,
                Name = x.Name,
                CategoryId = x.CategoryId,
                Category_Name = x.Category.Name,
            };

	}
}