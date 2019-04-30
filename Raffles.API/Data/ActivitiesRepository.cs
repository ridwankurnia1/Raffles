using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Threading.Tasks;

using Raffles.API.Models;
using AutoMapper;
using Raffles.API.Dto;

namespace Raffles.API.Data
{
    public class ActivitiesRepository : IActivitiesRepository
    {
        private DataContext _Context;
        private IMapper _Mapper;

        public ActivitiesRepository(DataContext context, IMapper mapper)
        {
            _Context = context;
            _Mapper = mapper;
        }        

        public async Task<bool> ActivityExists(string Activity)
        {
            if (await _Context.Activities.AsNoTracking().AnyAsync(x => x.ActivityName == Activity))
                return true;

            return false;
        }

        public async Task Add(Activity activity)
        {
            _Context.Activities.Add(activity);
            await _Context.SaveChangesAsync();
        }

        public async Task DeleteActivity(Activity activity)
        {
            var act = new Activity()
            {
                ActivityId = activity.ActivityId,
                Active = 1
            };

            _Context.Activities.Attach(act);
            act.Active = 0;
            act.UpdatedId = activity.UpdatedId;
            act.UpdatedDate = DateTime.Now;

            await _Context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Activity>> GetActivities()
        {
            var activities = await _Context.Activities.Include(u => u.Updated).ToListAsync();

            return activities;
        }

        public async Task<Activity> GetActivities(int id)
        {
            var activity = await _Context.Activities.FindAsync(id);
            _Context.Entry(activity).State = EntityState.Detached;

            return activity;
        }

        public async Task UpdateActivity(Activity activity)
        {
            var act = new Activity()
            {
                ActivityId = activity.ActivityId
            };

            _Context.Activities.Attach(act);
            act.ActivityName = activity.ActivityName;
            act.ActivityStart = activity.ActivityStart;
            act.ActivityEnd = activity.ActivityEnd;
            act.UpdatedId = activity.UpdatedId;
            act.UpdatedDate = DateTime.Now;

            await _Context.SaveChangesAsync();
        }
    }
}