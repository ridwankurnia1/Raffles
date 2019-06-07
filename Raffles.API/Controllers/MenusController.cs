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
    public class MenusController : ApiController
    {
        private DataContext db = new DataContext();
        private readonly IMenuRepository _Repo;
        private readonly IMapper _Mapper;

        public MenusController(IMenuRepository repo, IMapper mapper)
        {
            _Repo = repo;
            _Mapper = mapper;
        }

        // GET: api/Menus
        [Route("Menus")]
        [HttpGet]
        public async Task<IEnumerable<MenuDto>> GetMenus()
        {
            var menus = await _Repo.GetMenus();
            IEnumerable<MenuDto> dto = _Mapper.Map<IEnumerable<MenuDto>>(menus);

            return dto;
        }

        // GET: api/Menus/5
        //[ResponseType(typeof(Menu))]
        //public async Task<IHttpActionResult> GetMenu(int id)
        //{
        //    Menu menu = await db.Menus.FindAsync(id);
        //    if (menu == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(menu);
        //}

        // PUT: api/Menus/5
        //[ResponseType(typeof(void))]
        //public async Task<IHttpActionResult> PutMenu(int id, Menu menu)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != menu.UserId)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(menu).State = EntityState.Modified;

        //    try
        //    {
        //        await db.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!MenuExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        // POST: api/Menus
        [Route("Menus/{userId}")]
        [HttpPost]
        public async Task<IHttpActionResult> PostMenu(int userId, IEnumerable<Menu> menu)
        {
            if (menu != null)
            {
                if (menu.Any<Menu>())
                {
                    foreach(Menu item in menu)
                    {
                        bool exists = await _Repo.MenuExists(userId, item.ProgramId);
                        if (!exists)
                        {
                            item.UserId = userId;
                            await _Repo.Add(item);
                        }
                    }

                    return Ok();
                }
            }            

            return BadRequest();
        }

        // DELETE: api/Menus/5
        [Route("Menus/{userId}/{programId}")]
        [HttpDelete]        
        public async Task<IHttpActionResult> DeleteMenu(int userId, int programId)
        {
            var menu = await _Repo.GetMenus(userId, programId);
            await _Repo.DeleteMenu(menu);

            return Ok();
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