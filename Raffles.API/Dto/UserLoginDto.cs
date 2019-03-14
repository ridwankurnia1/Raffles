using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Raffles.API.Dto
{
    public class UserLoginDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}