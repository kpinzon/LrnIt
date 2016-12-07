
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
	public class ExpertiseDTO
    {
		public System.Int32 Id { get; set; }
		public System.String Name { get; set; }
		public System.String Description { get; set; }
		public System.Int32 YearsExperience { get; set; }
		public System.Int32 UserId { get; set; }
		public string User_Fname { get; set; }

        public static System.Linq.Expressions.Expression<Func< Expertise,  ExpertiseDTO>> SELECT =
            x => new  ExpertiseDTO
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                YearsExperience = x.YearsExperience,
                UserId = x.UserId,
                User_Fname = x.User.Fname,
            };

	}
}