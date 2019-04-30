using Raffles.API.Dto;
using Raffles.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Raffles.API.Data
{
    public interface IActivitiesRepository
    {
        Task Add(Activity activity);
        Task<IEnumerable<Activity>> GetActivities();
        Task<Activity> GetActivities(int id);
        Task UpdateActivity(Activity activity);
        Task DeleteActivity(Activity activity);
        Task<bool> ActivityExists(string Activity);
    }
}