using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Web;
using Raffles.API.Models;

namespace Raffles.API.Data
{
    public class MenuRepository : IMenuRepository
    {
        private DataContext _Context;

        public MenuRepository(DataContext context)
        {
            _Context = context;
        }

        public async Task Add(Menu menu)
        {
            _Context.Menus.Add(menu);
            await _Context.SaveChangesAsync();
        }

        public async Task DeleteMenu(Menu menu)
        {
            _Context.Menus.Remove(menu);
            await _Context.SaveChangesAsync();
        }        

        public async Task<IEnumerable<Menu>> GetMenus()
        {
            var menus = await _Context.Menus.Include(u => u.user).ToListAsync();
            return menus;
        }

        public async Task<Menu> GetMenus(int userId, int programId)
        {
            var menus = await _Context.Menus.FirstOrDefaultAsync(m => m.UserId == userId && m.ProgramId == programId);
            return menus;
        }

        public async Task<bool> MenuExists(int userId, int ProgramId)
        {
            if (await _Context.Menus.AsNoTracking().AnyAsync(x => x.UserId == userId && x.ProgramId == ProgramId))
                return true;

            return false;
        }
    }
}