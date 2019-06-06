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
    public class UsersController : ApiController
    {
        private DataContext db = new DataContext();
        private readonly IUserRepository _Repo;
        private readonly IMapper _Mapper;

        public UsersController(IUserRepository repo, IMapper mapper)
        {
            _Repo = repo;
            _Mapper = mapper;
        }

        // GET: api/Users
        [Route("Users")]
        [HttpGet]
        public async Task<IHttpActionResult> GetUsers()
        {
            var users = await _Repo.GetUsers();
            IEnumerable<UserProfileDto> userProfiles = _Mapper.Map<IEnumerable<UserProfileDto>>(users);

            return Ok(userProfiles);
        }

        // GET: api/Users/5        
        [Route("users/{id}", Name = "GetUser")]
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> GetUser(int id)
        {
            User user = await db.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [Route("Users")]
        [HttpPost]
        public async Task<IHttpActionResult> Register(UserProfileDto userRegister)
        {
            userRegister.Username = userRegister.Username.ToLower();

            if (await _Repo.UserExists(userRegister.Username))
                return BadRequest("User Id sudah digunakan");

            var UserToCreate = _Mapper.Map<User>(userRegister);
            UserToCreate.Active = 1;

            var CreatedUser = await _Repo.Register(UserToCreate, userRegister.Password);

            return CreatedAtRoute("DefaultApi", new { controller = "Users", id = CreatedUser.Id }, CreatedUser);
        }

        // PUT: api/Users/5        
        [ResponseType(typeof(void))]
        [Route("users/{id}")]
        [HttpPut]
        public async Task<IHttpActionResult> PutUser(int id, UserProfileDto userProfile)
        {            
            var UserToUpdate = _Mapper.Map<User>(userProfile);
            UserToUpdate.Id = id;
            await _Repo.UpdateProfile(UserToUpdate, userProfile.Password);

            return StatusCode(HttpStatusCode.NoContent);
        }

        [ResponseType(typeof(User))]
        [Route("users/{id}")]
        [HttpDelete]
        public async Task<IHttpActionResult> DeleteUser(int id)
        {
            User user = await db.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            await _Repo.DeleteProfile(id);

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
    }
}