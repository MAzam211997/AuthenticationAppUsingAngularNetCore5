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
using AutoMapper;

namespace AuthenticationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly AppDataContext _context;
        private readonly IMapper _mapper;
        public QuestionsController(AppDataContext context, IMapper mapper)
        {
            _context = context; 
            _mapper = mapper;
        }

        // GET: api/Questions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Questions>>> GetQuestions()
        {
            return await _context.Questions.ToListAsync();
        }
        
        // GET: api/Questions
        [HttpGet("GetAllFormFields")]
        public async Task<ActionResult<IEnumerable<FormFields>>> GetAllFormFields()
        {
            return await _context.FormFields.ToListAsync();
        }
        
        // GET: api/Questions
        [HttpGet("GetAllOptions")]
        public async Task<ActionResult<IEnumerable<Options>>> GetAllOptions()
        {
            return await _context.Options.ToListAsync();
        }

        // GET: api/Questions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Questions>> GetQuestions(int id)
        {
            var questions = await _context.Questions.FindAsync(id);

            if (questions == null)
            {
                return NotFound();
            }

            return questions;
        }

        // PUT: api/Questions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestions(int id, Questions questions)
        {
            if (id != questions.QuestionId)
            {
                return BadRequest();
            }

            _context.Entry(questions).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionsExists(id))
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

        // POST: api/Questions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Questions>> CreateQuestion(QuestionsDto[] questions)
        {           
            Questions questions1 = new Questions();
            bool isRowSaved = false;
            foreach (var q in questions)
            {
                Options options1 = new Options();
                if (!isRowSaved)
                {
                    questions1.Description = q.Question;
                    questions1.FormFieldId = q.QuestionType;
                    _context.Questions.Add(questions1);
                    await _context.SaveChangesAsync();
                    isRowSaved = true;
                }
                options1.OptionText = q.OptionText;
                options1.IsCorrect = q.IsCorrect;
                options1.FormFieldId = q.QuestionType;
                options1.QuestionId = questions1.QuestionId;

                _context.Options.Add(options1);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }

        // DELETE: api/Questions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestions(int id)
        {
            var questions = await _context.Questions.FindAsync(id);
            if (questions == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(questions);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuestionsExists(int id)
        {
            return _context.Questions.Any(e => e.QuestionId == id);
        }
    }
}
