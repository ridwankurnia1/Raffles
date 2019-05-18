using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Raffles.API.Helper
{
    public class TransParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;

        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        public string dateFr { get; set; }
        public string dateTo { get; set; }
        public string trType { get; set; }
        public int activity { get; set; }
        public string Active { get; set; }
    }
}