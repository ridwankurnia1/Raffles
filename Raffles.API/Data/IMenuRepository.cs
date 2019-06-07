using Raffles.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Raffles.API.Data
{
    public interface IMenuRepository
    {
        Task Add(Menu menu);
        Task<IEnumerable<Menu>> GetMenus();
        Task<Menu> GetMenus(int userId, int programId);
        Task DeleteMenu(Menu menu);
        Task<bool> MenuExists(int userId, int ProgramId);
    }
}