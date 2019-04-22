using Raffles.API.Models;
using System.Threading.Tasks;

namespace Raffles.API.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string username, string password);        
    }
}
