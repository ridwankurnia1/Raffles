using Raffles.API.Dto;
using Raffles.API.Helper;
using Raffles.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Raffles.API.Data
{
    public interface ITransactionRepository
    {
        Task Add(Transaction transaction);
        Task<IEnumerable<Transaction>> GetTransReport(TransParams transParams);
        Task<PagedList<Transaction>> GetTransaction(TransParams transParams);
        Task<Transaction> GetTransaction(int id);        
        Task DeleteTransaction(Transaction transaction);        
    }
}