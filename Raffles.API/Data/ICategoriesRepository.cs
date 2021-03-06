﻿using Raffles.API.Dto;
using Raffles.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Raffles.API.Data
{
    public interface ICategoriesRepository
    {
        Task Add(Categories categories);
        Task<IEnumerable<Categories>> GetCategories();
        Task<Categories> GetCategories(int id);
        Task UpdateCategory(CategoryDto categories);
        Task DeleteCategory(CategoryDto categories);
        Task<bool> CategoryExists(string Category, string TransType);
    }
}