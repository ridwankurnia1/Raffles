using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Raffles.API.Models
{
    public class Activity
    {
        [Key]
        public int ActivityId { get; set; }
        public string ActivityName { get; set; }
        public DateTime? ActivityStart { get; set; }
        public DateTime? ActivityEnd { get; set; }
        public Int16 Active { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int CreatedId { get; set; }
        public User Created { get; set; }
        public int UpdatedId { get; set; }
        public User Updated { get; set; }
    }
}