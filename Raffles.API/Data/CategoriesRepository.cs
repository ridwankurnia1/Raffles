using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Threading.Tasks;

using Raffles.API.Models;
using Raffles.API.Dto;

namespace Raffles.API.Data
{
    public class CategoriesRepository : ICategoriesRepository
    {
        private DataContext _Context;

        public CategoriesRepository(DataContext context)
        {
            _Context = context;
        }

        public async Task Add(Categories categories)
        {
            _Context.Categories.Add(categories);
            await _Context.SaveChangesAsync();
        }

        public async Task DeleteCategory(CategoryDto categories)
        {
            var category = new Categories()
            {
                CategoryId = categories.CategoryId,
                Active = 1
            };

            _Context.Categories.Attach(category);
            category.Active = 0;
            category.UpdatedId = categories.UpdatedId;
            category.UpdatedDate = DateTime.Now;

            await _Context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Categories>> GetCategories()
        {
            var categories = await _Context.Categories.Include(u => u.Updated).ToListAsync();

            return categories;
        }

        public async Task<Categories> GetCategories(int id)
        {
            var category = await _Context.Categories.FindAsync(id);
            _Context.Entry(category).State = EntityState.Detached;

            return category;
        }

        public async Task UpdateCategory(CategoryDto categories)
        {
            var category = new Categories()
            {
                CategoryId = categories.CategoryId
            };

            _Context.Categories.Attach(category);
            category.CategoryName = categories.CategoryName;
            category.TransactionType = categories.TransactionType;
            category.Active = categories.Active;
            category.UpdatedId = categories.UpdatedId;
            category.UpdatedDate = DateTime.Now;

            await _Context.SaveChangesAsync();
        }

        public async Task<bool> CategoryExists(string Category, string TransType)
        {            
            if (await _Context.Categories.AsNoTracking().AnyAsync(x => x.CategoryName == Category && x.TransactionType == TransType))
                return true;

            return false;
        }
    }
}