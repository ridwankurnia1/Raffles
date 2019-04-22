﻿using Raffles.API.Dto;
using Raffles.API.Models;
using System.Threading.Tasks;
using System.Web;

namespace Raffles.API.Data
{
    public interface IUserRepository
    {
        Task<User> Register(User user, string password);
        Task<bool> UserExists(string username);
        Task UpdateProfile(User user, string password);
        Task DeleteProfile(int id);
    }
}