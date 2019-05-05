using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Raffles.API.Dto
{
    public class MenuDto
    {
        public int UserId { get; set; }
        public string Program { get; set; }
        public string MenuGroup { get; set; }
        public string MenuName { get; set; }
        public string MenuType { get; set; }
        public string Username { get; set; }        
    }
}