
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
	public class ConversationDTO
    {
		public System.Int32 Id { get; set; }
		public System.DateTime TimeCreated { get; set; }
		public System.String Subject { get; set; }
		public int Messages_Count { get; set; }
        public int RecipientId { get; set; }
        public int SenderId { get; set; }
        public User Recipient { get; set; }
        public User Sender { get; set; }
        public ICollection<Message> Messages { get; set; }

        public static System.Linq.Expressions.Expression<Func<Conversation, ConversationDTO>> SELECT =
            x => new ConversationDTO
            {
                Id = x.Id,
                TimeCreated = x.TimeCreated,
                Subject = x.Subject,
                Messages_Count = x.Messages.Count(),
                RecipientId = x.RecipientId,
                SenderId = x.SenderId,
                Recipient = x.Recipient,
                Sender = x.Sender,
                Messages = x.Messages
            };

	}
}