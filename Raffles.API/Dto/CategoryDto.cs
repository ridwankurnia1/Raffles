using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Raffles.API.Dto
{
    public class CategoryDto
    {        
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string TransactionType { get; set; }
        public Int16 Active { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int CreatedId { get; set; }
        public string CreatedUser { get; set; }
        public int UpdatedId { get; set; }
        public string UpdatedUser { get; set; }
    }
}