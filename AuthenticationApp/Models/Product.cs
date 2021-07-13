using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AuthenticationApp.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        public String Name { get; set; }
        public String Description { get; set; }
        public double SalePrice { get; set; }
        public double UnitPrice { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
