
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
	public class UserDTO
    {
		public System.Int32 Id { get; set; }
		public System.String Fname { get; set; }
		public System.String Lname { get; set; }
		public System.String Email { get; set; }
		public System.String Phone { get; set; }
		public System.String Username { get; set; }
		public System.String Password { get; set; }
		public System.Boolean? IsBanned { get; set; }
		public System.String Bio { get; set; }
		public System.String Image { get; set; }
		public System.Decimal? HourlyRate { get; set; }
		public System.Boolean? IsTeacher { get; set; }
		public System.String Headline { get; set; }
		public int Messages_Count { get; set; }
		public int Experiences_Count { get; set; }
        public ICollection<Tag> Tags { get; set; }
        

        public static System.Linq.Expressions.Expression<Func< User,  UserDTO>> SELECT =
            x => new  UserDTO
            {
                Id = x.Id,
                Fname = x.Fname,
                Lname = x.Lname,
                Email = x.Email,
                Phone = x.Phone,
                Username = x.Username,
                Password = x.Password,
                IsBanned = x.IsBanned,
                Bio = x.Bio,
                Image = x.Image,
                HourlyRate = x.HourlyRate,
                IsTeacher = x.IsTeacher,
                Headline = x.Headline,
                Messages_Count = x.Messages.Count(),
                Experiences_Count = x.Experiences.Count(),
                Tags = x.Tags
            };

	}
}