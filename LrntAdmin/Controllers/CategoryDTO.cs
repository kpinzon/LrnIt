
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
	public class CategoryDTO
    {
		public System.Int32 Id { get; set; }
		public System.String Name { get; set; }
		public System.String Description { get; set; }
		public int Tags_Count { get; set; }
        public ICollection<Tag> Tags { get; set; }

        public static System.Linq.Expressions.Expression<Func<Category, CategoryDTO>> SELECT =
            x => new CategoryDTO
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                Tags_Count = x.Tags.Count(),
                Tags = x.Tags
            };

	}
}