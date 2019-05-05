using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using AutoMapper;
using Raffles.API.Data;
using Raffles.API.Dto;
using Raffles.API.Models;

namespace Raffles.API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ActivitiesController : ApiController
    {
        private DataContext db = new DataContext();
        private readonly IActivitiesRepository _Repo;
        private readonly IMapper _Mapper;

        public ActivitiesController(IActivitiesRepository repo, IMapper mapper)
        {
            _Repo = repo;
            _Mapper = mapper;
        }

        // GET: api/Activities
        [Route("api/Activities")]
        [HttpGet]
        public async Task<IEnumerable<ActivityDto>> GetActivities()
        {
            var activities = await _Repo.GetActivities();
            IEnumerable<ActivityDto> dto = _Mapper.Map <IEnumerable<ActivityDto>>(activities);

            return dto;
        }

        // GET: api/Activities/5
        [Route("api/Activities/{id}")]
        [HttpGet]
        [ResponseType(typeof(Activity))]
        public async Task<IHttpActionResult> GetActivity(int id)
        {
            Activity activity = await _Repo.GetActivities(id);
            if (activity == null)
            {
                return NotFound();
            }

            return Ok(activity);
        }

        // PUT: api/Activities/5
        [Route("api/Activities/{id}")]
        [HttpPut]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutActivity(int id, ActivityDto activity)
        {
            var activityFromRepo = await _Repo.GetActivities(id);

            if (activityFromRepo != null)
            {
                if (activityFromRepo.Active == activity.Active)
                {
                    if (activityFromRepo.ActivityName != activity.ActivityName && 
                        await _Repo.ActivityExists(activity.ActivityName))
                    {
                        return BadRequest("Kegiatan sudah pernah dibuat");
                    }                    
                }
            }
            else
            {
                return BadRequest("Data tidak ditemukan");
            }

            await _Repo.UpdateActivity(activity);

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Activities
        [Route("api/Activities")]
        [HttpPost]
        public async Task<IHttpActionResult> PostActivity(Activity activity)
        {
            if (await _Repo.ActivityExists(activity.ActivityName))
                return BadRequest("Kegiatan sudah pernah dibuat");

            activity.CreatedDate = DateTime.Now;
            activity.UpdatedDate = DateTime.Now;
            await _Repo.Add(activity);

            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE: api/Activities/5
        [Route("api/Activities")]
        [HttpPut]
        public async Task<IHttpActionResult> DeleteActivity(ActivityDto activity)
        {
            await _Repo.DeleteActivity(activity);

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}