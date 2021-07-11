using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AuthenticationApp.Data;
using AuthenticationApp.Models;
using AuthenticationApp.ViewModels;

namespace AuthenticationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubmittedAnswersController : ControllerBase
    {
        private readonly AppDataContext _context;

        public SubmittedAnswersController(AppDataContext context)
        {
            _context = context;
        }

        // GET: api/SubmittedAnswers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubmittedAnswers>>> GetSubmittedAnswers()
        {
            return await _context.SubmittedAnswers.ToListAsync();
        }

        // GET: api/SubmittedAnswers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubmittedAnswers>> GetSubmittedAnswers(int id)
        {
            var submittedAnswers = await _context.SubmittedAnswers.FindAsync(id);

            if (submittedAnswers == null)
            {
                return NotFound();
            }

            return submittedAnswers;
        }

        // PUT: api/SubmittedAnswers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubmittedAnswers(int id, SubmittedAnswers submittedAnswers)
        {
            if (id != submittedAnswers.SubmittedAnswersId)
            {
                return BadRequest();
            }

            _context.Entry(submittedAnswers).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubmittedAnswersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/SubmittedAnswers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SubmittedAnswers>> PostSubmittedAnswers(AnswersDto[] submittedAnswers)
        {
            if (submittedAnswers.Length > 0)
            {
                foreach (var answer in submittedAnswers)
                {
                    bool optionChecker = false;
                    SubmittedAnswers answers = new SubmittedAnswers();
                    if (answer.FormFieldId > 1)
                    {
                        if (answer.FormFieldId == 2 || answer.FormFieldId == 4)
                        {
                            var optionId = answer.QuestionAns; ;
                            answers.OptionId =Convert.ToInt32(optionId);// _context.Options.Where(x=>x.OptionId == Convert.ToInt32( answer.QuestionAns));
                            answers.QuestionId = answer.QuestionId;
                            answers.FormFieldId = answer.FormFieldId;
                            answers.AnswerText = answer.OptionText;
                        }
                        else if (answer.FormFieldId == 3 && answer.OptionText != null)
                        {
                            optionChecker = true;
                            //answers.OptionId = _context.Options.Where(x=>x.OptionId == Convert.ToInt32( answer.QuestionAns));
                            answers.QuestionId = answer.QuestionId;
                            answers.IsCorrect = answer.IsCorrect;
                            answers.FormFieldId = answer.FormFieldId;
                            answers.AnswerText = answer.OptionText;
                            answers.OptionId = answer.OptionId;
                        }
                    }
                    else
                    {
                        optionChecker = true;
                        answers.AnswerText = answer.QuestionAns;
                        answers.QuestionId = answer.QuestionId;
                        answers.FormFieldId = answer.FormFieldId;
                    }
                    if (optionChecker == true)
                    {
                        _context.SubmittedAnswers.Add(answers);
                        await _context.SaveChangesAsync();
                    }
                }
            }
            return Ok();
        }

        // DELETE: api/SubmittedAnswers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubmittedAnswers(int id)
        {
            var submittedAnswers = await _context.SubmittedAnswers.FindAsync(id);
            if (submittedAnswers == null)
            {
                return NotFound();
            }

            _context.SubmittedAnswers.Remove(submittedAnswers);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubmittedAnswersExists(int id)
        {
            return _context.SubmittedAnswers.Any(e => e.SubmittedAnswersId == id);
        }
    }
}
