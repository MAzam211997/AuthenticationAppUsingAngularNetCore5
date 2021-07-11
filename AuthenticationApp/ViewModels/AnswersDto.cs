using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthenticationApp.Models;

namespace AuthenticationApp.ViewModels
{
    public class AnswersDto
    {
        public String QuestionAns { get; set; }
        public String OptionText { get; set; }
        public bool IsCorrect { get; set; }
        public bool IsChecked { get; set; }
        public int FormFieldId{ get; set; }
        public int QuestionId { get; set; }
        public int OptionId { get; set; }
        public List<Options> Option { get; set; }
        public List<Questions> Questions{ get; set; }
    }
}
