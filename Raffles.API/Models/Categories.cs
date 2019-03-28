using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Raffles.API.Models
{
    public class Categories
    {
        [Key]
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string TransactionType { get; set; }        
        public int DeleteFlag { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int CreatedId { get; set; }
        public User Created { get; set; }
        public int UpdatedId { get; set; }
        public User Updated { get; set; }
    }
}