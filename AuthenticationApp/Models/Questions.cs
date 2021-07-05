using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AuthenticationApp.Models
{
    public class Questions
    {
        [Key]
        public int QuestionId { get; set; }
        public String Description { get; set; }

        public int FormFieldId { get; set; }
        [ForeignKey("FormFieldId")]
        public virtual FormFields FormFields { get; set; }
    }
}
