using System;
using System.ComponentModel.DataAnnotations;

namespace Raffles.API.Dto
{
    public class ActivityDto
    {
        public int ActivityId { get; set; }
        public string ActivityName { get; set; }
        public DateTime? ActivityStart { get; set; }
        public DateTime? ActivityEnd { get; set; }
        public Int16 Active { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int CreatedId { get; set; }
        public string CreatedUser { get; set; }
        public int UpdatedId { get; set; }
        public string UpdatedUser { get; set; }
    }
}