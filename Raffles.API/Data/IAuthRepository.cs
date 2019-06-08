using Raffles.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Raffles.API.Data
{
    public interface IAuthRepository
    {
        Task<IEnumerable<Menu>> GetMenus(int userId);
        Task<User> Register(User user, string password);
        Task<User> Login(string username, string password);
        Task<bool> isAuthorize(int userId, int programId);
    }
}
