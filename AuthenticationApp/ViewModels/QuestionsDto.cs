using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthenticationApp.Models;

namespace AuthenticationApp.ViewModels
{
    public class QuestionsDto
    {
        public int QuestionType { get; set; }
        public String Question { get; set; }
        public String OptionText { get; set; }
        public bool IsCorrect { get; set; }
        public Questions Questions { get; set; }
        public Options Options { get; set; }
    }
}
