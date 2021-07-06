using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AuthenticationApp.Models
{
    public class Options
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OptionId { get; set; }
        public String OptionText { get; set; }
        public bool IsCorrect { get; set; }
        public int FormFieldId { get; set; }
        public int QuestionId { get; set; }

        //[ForeignKey("FormFieldId")]
        public FormFields FormFields { get; set; }
       // [ForeignKey("QuestionId")]
        public Questions Questions { get; set; }
    }
}
