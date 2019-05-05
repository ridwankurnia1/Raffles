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
    public class CategoriesController : ApiController
    {
        //private DataContext db = new DataContext();
        private readonly ICategoriesRepository _Repo;
        private readonly IMapper _Mapper;

        public CategoriesController(ICategoriesRepository repo, IMapper mapper)
        {
            _Repo = repo;
            _Mapper = mapper;
        }

        // GET: api/Categories
        [Route("api/Categories")]
        [HttpGet]
        public async Task<IEnumerable<CategoryDto>> GetCategories()
        {
            var categories = await _Repo.GetCategories();
            IEnumerable<CategoryDto> dto = _Mapper.Map<IEnumerable<CategoryDto>>(categories);

            return dto;
        }

        // GET: api/Categories/5
        [Route("api/Categories/{id}")]
        [HttpGet]
        [ResponseType(typeof(CategoryDto))]
        public async Task<IHttpActionResult> GetCategory(int id)
        {
            Categories category = await _Repo.GetCategories(id);
            if (category == null)
            {
                return NotFound();
            }

            return Ok(_Mapper.Map<CategoryDto>(category));
        }

        // PUT: api/Categories/5
        [Route("api/Categories/{id}")]
        [HttpPut]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCategory(int id, CategoryDto category)
        {
            var categoryFromRepo = await _Repo.GetCategories(id);

            if (categoryFromRepo != null)
            {
                if (categoryFromRepo.Active == category.Active)
                {
                    if (await _Repo.CategoryExists(category.CategoryName, category.TransactionType))
                        return BadRequest("Kategori sudah pernah dibuat");
                }
            }
            else
            {
                return BadRequest("Data tidak ditemukan");
            }

            await _Repo.UpdateCategory(category);

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Categories
        [Route("api/Categories")]
        [HttpPost]
        public async Task<IHttpActionResult> PostCategory(Categories category)
        {
            if (await _Repo.CategoryExists(category.CategoryName, category.TransactionType))
                return BadRequest("Kategori sudah pernah dibuat");

            category.CreatedDate = DateTime.Now;
            category.UpdatedDate = DateTime.Now;
            await _Repo.Add(category);

            return StatusCode(HttpStatusCode.OK);
        }

        // DELETE: api/Categories
        [Route("api/Categories")]
        [HttpPut]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> DeleteCategory(CategoryDto categories)
        {
            await _Repo.DeleteCategory(categories);

            return StatusCode(HttpStatusCode.NoContent);
        }

        //protected override void Dispose(bool disposing)
        //{
        //    if (disposing)
        //    {
        //        db.Dispose();
        //    }
        //    base.Dispose(disposing);
        //}
    }
}