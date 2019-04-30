using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Raffles.API.Models
{
    public class Authorization
    {
        public int UserId { get; set; }
        public User user { get; set; }
        public string Program { get; set; }
        public string MenuName { get; set; }
    }
}