using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

using Raffles.API.Models;

namespace Raffles.API.Data
{
    public class UserRepository : IUserRepository
    {
        private DataContext _Context;

        public UserRepository(DataContext context)
        {
            _Context = context;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] PasswordHash, PasswordSalt;
            CreatePasswordHash(password, out PasswordHash, out PasswordSalt);
            user.PasswordHash = PasswordHash;
            user.PasswordSalt = PasswordSalt;

            _Context.Users.Add(user);
            await _Context.SaveChangesAsync();

            return user;
        }

        public async Task UpdateProfile(User UpdateUser, string password)
        {
            var user = new User()
            {
                Id = UpdateUser.Id
            };

            _Context.Users.Attach(user);
            user.Email = UpdateUser.Email;
            user.Phone = UpdateUser.Phone;
            user.BlockNo = UpdateUser.BlockNo;
            user.HouseNo = UpdateUser.HouseNo;
            user.Active = UpdateUser.Active;

            if (!string.IsNullOrEmpty(password))
            {
                byte[] PasswordHash, PasswordSalt;
                CreatePasswordHash(password, out PasswordHash, out PasswordSalt);
                user.PasswordHash = PasswordHash;
                user.PasswordSalt = PasswordSalt;
            }

            await _Context.SaveChangesAsync();
        }

        public async Task DeleteProfile(int id)
        {
            var user = new User()
            {
                Id = id,
                Active = 1
            };

            _Context.Users.Attach(user);
            user.Active = 0;

            await _Context.SaveChangesAsync();
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _Context.Users.AnyAsync(x => x.Username == username))
                return true;

            return false;
        }
    }
}