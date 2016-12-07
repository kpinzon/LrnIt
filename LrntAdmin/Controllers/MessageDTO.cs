
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
	public class MessageDTO
    {
		public System.Int32 Id { get; set; }
		public System.String Text { get; set; }
		public System.DateTime TimeSent { get; set; }
		public System.Boolean IsRead { get; set; }
		public System.Int32 ConversationId { get; set; }
		public System.Int32 UserId { get; set; }
		public string Conversation_Subject { get; set; }
		public string User_Fname { get; set; }

        public static System.Linq.Expressions.Expression<Func< Message,  MessageDTO>> SELECT =
            x => new  MessageDTO
            {
                Id = x.Id,
                Text = x.Text,
                TimeSent = x.TimeSent,
                IsRead = x.IsRead,
                ConversationId = x.ConversationId,
                UserId = x.UserId,
                Conversation_Subject = x.Conversation.Subject,
                User_Fname = x.User.Fname,
            };

	}
}