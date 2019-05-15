using System;
using System.ComponentModel.DataAnnotations;

namespace Raffles.API.Dto
{
    public class TransactionDto
    {
        public int Id { get; set; }
        public DateTime? TransactionDate { get; set; }
        public string TransactionType { get; set; }        
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int ActivityId { get; set; }
        public string ActivityName { get; set; }
        public DateTime? ActivityStart { get; set; }
        public DateTime? ActivityEnd { get; set; }
        public int ActivityStatus { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public int ReferenceId { get; set; }
        public int Active { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int CreatedId { get; set; }
        public string CreatedUser { get; set; }        
    }
}