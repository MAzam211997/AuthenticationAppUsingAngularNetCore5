using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AuthenticationApp.Models
{
    public class FormFields
    {
        [Key]
        public int FormFieldId { get; set; }
        public String Name { get; set; }
    }
}
