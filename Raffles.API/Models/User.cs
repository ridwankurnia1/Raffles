using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Raffles.API.Models
{
    public class User
    {
        public int Id { get; set; }        
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string BlockNo { get; set; }
        public string HouseNo { get; set; }
        public DateTime? LastLogin { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Int16 Active { get; set; }
        public int AuthorizedBy { get; set; }
        public DateTime? AuthorizedDate { get; set; }
    }
}