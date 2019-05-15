using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Threading.Tasks;

using Raffles.API.Models;
using AutoMapper;
using Raffles.API.Dto;
using Raffles.API.Helper;

namespace Raffles.API.Data
{
    public class TransactionRepository : ITransactionRepository
    {
        private DataContext _Context;
        private IMapper _Mapper;

        public TransactionRepository(DataContext context, IMapper mapper)
        {
            _Context = context;
            _Mapper = mapper;
        }

        public async Task Add(Transaction transaction)
        {
            _Context.transactions.Add(transaction);
            await _Context.SaveChangesAsync();
        }

        public async Task DeleteTransaction(Transaction transaction)
        {
            var trans = new Transaction()
            {
                Id = transaction.Id,
                Active = 1
            };

            _Context.transactions.Attach(trans);
            trans.Active = 0;

            transaction.Amount = transaction.Amount * (-1);
            transaction.Active = 0;
            transaction.ReferenceId = trans.Id;
            transaction.TransactionDate = DateTime.Now;
            transaction.CreatedDate = DateTime.Now;
            _Context.transactions.Add(transaction);

            await _Context.SaveChangesAsync();
        }

        public async Task<PagedList<Transaction>> GetTransaction(TransParams transParams)
        {
            var transaction = _Context.transactions.Include(u => u.Created).Include(c => c.Category).Include(a => a.Activity)
                .OrderByDescending(t => t.Id).AsQueryable();
            
            if (transParams.ActivityId > 0)
            {
                transaction = transaction.Where(t => t.ActivityId == transParams.ActivityId);                
            }

            DateTime? dtFr = null;
            DateTime? dtTo = null;

            if (!string.IsNullOrEmpty(transParams.dateFr))
                dtFr = CommonMethod.stringToDate(transParams.dateFr);

            if (!string.IsNullOrEmpty(transParams.dateTo))
                dtTo = CommonMethod.stringToDate(transParams.dateTo);

            if (dtFr != null)
            {
                if (dtTo != null)
                {
                    transaction = transaction.Where(t => t.TransactionDate >= dtFr && t.TransactionDate <= dtTo);
                }
                else
                {
                    transaction = transaction.Where(t => t.TransactionDate >= dtFr);
                }
            }
            else if (dtTo != null)
            {
                transaction = transaction.Where(t => t.TransactionDate <= dtTo);
            }

            if (!string.IsNullOrEmpty(transParams.trType))
            {
                transaction = transaction.Where(t => t.TransactionType == transParams.trType);
            }            

            return await PagedList<Transaction>.CreateAsync(transaction, transParams.PageNumber, transParams.PageSize);
        }

        public async Task<Transaction> GetTransaction(int id)
        {
            var trans = await _Context.transactions.FindAsync(id);
            _Context.Entry(trans).State = EntityState.Detached;

            return trans;
        }
    }
}