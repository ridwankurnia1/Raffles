using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using AutoMapper;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Raffles.API.Data;
using Raffles.API.Dto;
using Raffles.API.Helper;
using Raffles.API.Models;

namespace Raffles.API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class TransactionsController : ApiController
    {
        private DataContext db = new DataContext();
        private readonly ITransactionRepository _Repo;
        private readonly IMapper _Mapper;

        public TransactionsController(ITransactionRepository repo, IMapper mapper)
        {
            _Repo = repo;
            _Mapper = mapper;
        }

        // GET: api/Transactions
        [Route("api/Transactions")]
        [HttpGet]
        public async Task<IHttpActionResult> Gettransactions([FromUri]TransParams transParams)
        {
            var trans = await _Repo.GetTransaction(transParams);
            var result = _Mapper.Map<IEnumerable<TransactionDto>>(trans);

            var paginationHeader = new PaginationHeader(trans.CurrentPage, trans.PageSize, trans.TotalCount, trans.TotalPages);
            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            Request.Properties["Pagination"] = JsonConvert.SerializeObject(paginationHeader, camelCaseFormatter);

            return Ok(_Mapper.Map<IEnumerable<TransactionDto>>(trans));
        }

        [Route("api/transrpt")]
        [HttpGet]
        public async Task<IHttpActionResult> GetTransReport([FromUri]TransParams transParams)
        {
            var trans = await _Repo.GetTransReport(transParams);

            return Ok(_Mapper.Map<IEnumerable<TransactionDto>>(trans));
        }

        // GET: api/Transactions/5
        [Route("api/Transactions/{id}")]
        [HttpGet]
        [ResponseType(typeof(Transaction))]
        public async Task<IHttpActionResult> GetTransaction(int id)
        {
            var transaction = await _Repo.GetTransaction(id);

            if (transaction == null)
            {
                return NotFound();
            }

            return Ok(transaction);
        }

        // PUT: api/Transactions/5
        //[ResponseType(typeof(void))]
        //public async Task<IHttpActionResult> PutTransaction(int id, Transaction transaction)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != transaction.Id)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(transaction).State = EntityState.Modified;

        //    try
        //    {
        //        await db.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!TransactionExists(id))
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

        // POST: api/Transactions

        [Route("api/Transactions")]
        [HttpPost]
        public async Task<IHttpActionResult> PostTransaction(Transaction transaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            transaction.Active = 1;
            transaction.CreatedDate = DateTime.Now;
            await _Repo.Add(transaction);

            return Ok();
        }

        // DELETE: api/Transactions/5
        [Route("api/Transactions/{id}")]
        [HttpDelete]
        public async Task<IHttpActionResult> DeleteTransaction(int id)
        {
            Transaction transaction = await _Repo.GetTransaction(id);            
            if (transaction == null)
            {
                return NotFound();
            }

            await _Repo.DeleteTransaction(transaction);

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