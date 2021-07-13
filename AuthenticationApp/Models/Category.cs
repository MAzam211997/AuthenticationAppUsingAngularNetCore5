using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AuthenticationApp.Models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        public String Name { get; set; }
    }
}
