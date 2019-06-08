using System;
using System.Linq;
using System.Data.Entity;
using System.Threading.Tasks;
using Raffles.API.Models;
using System.Collections.Generic;

namespace Raffles.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private DataContext _Context;

        public AuthRepository(DataContext context)
        {
            _Context = context;
        }

        public async Task<IEnumerable<Menu>> GetMenus(int userId)
        {
            var menus = await _Context.Menus.Where(m => m.UserId == userId).OrderBy(m => m.ProgramId).Include(u => u.user).ToListAsync();
            return menus;
        }

        public async Task<User> Login(string username, string password)
        {
            var user = await _Context.Users.FirstOrDefaultAsync(x => x.Username == username);

            if (user == null)
                return null;

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                        return false;
                }
            }

            return true;
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

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> isAuthorize(int userId, int programId)
        {
            if (await _Context.Menus.AnyAsync(m => m.UserId == userId && m.ProgramId == programId))
                return true;

            return false;
        }
    }
}