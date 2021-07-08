using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AuthenticationApp.Models
{
    public class SubmittedAnswers
    {
        [Key]
        public int SubmittedAnswersId { get; set; }
        public String AnswerText { get; set; }
        public bool IsCorrect { get; set; }
        public int FormFieldId { get; set; }
        public int QuestionId { get; set; }
        public int OptionId { get; set; }
        public Options Options  { get; set; }
        public Questions Questions { get; set; }
        public FormFields FormFields{ get; set; }
    }
}
