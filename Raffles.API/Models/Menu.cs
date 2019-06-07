using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Raffles.API.Models
{
    public class Menu
    {
        [Key]
        [Column(Order=1)]
        public int UserId { get; set; }
        public User user { get; set; }
        [Key]
        [Column(Order = 2)]
        public int ProgramId { get; set; }
        public string Program { get; set; }
        public string MenuGroup { get; set; }        
        public string MenuName { get; set; }
        public string MenuType { get; set; }
    }
}