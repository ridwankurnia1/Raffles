using System;
using System.ComponentModel.DataAnnotations;

namespace Raffles.API.Dto
{
    public class UserProfileDto
    {        
        [Required]        
        public string Username { get; set; }
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Phone { get; set; }
        public string BlockNo { get; set; }
        public string HouseNo { get; set; }
        public short Active { get; set; }

        public DateTime? LastLogin { get; set; }
        public DateTime? CreatedDate { get; set; }        

        public UserProfileDto()
        {
            CreatedDate = DateTime.Now;
            LastLogin = DateTime.Now;
        }
    }
}