using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Raffles.API.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public DateTime? TransactionDate { get; set; }
        public string TransactionType { get; set; }
        public int CategoryId { get; set; }
        public Categories Category { get; set; }
        public int ActivityId { get; set; }
        public Activity Activity { get; set; }
        public string Description { get; set; }        
        public decimal Amount { get; set; }
        public int ReferenceId { get; set; }
        public int Active { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int CreatedId { get; set; }
        public User Created { get; set; }

        public Transaction()
        {
            CreatedDate = DateTime.Now;
        }
    }
}