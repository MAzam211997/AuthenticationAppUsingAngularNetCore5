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
        public ActionResult<IEnumerable<OptionsDto>> GetQuestions()
        {
            var options = (from q in _context.Questions.Include(x => x.FormFields).ToList() select new OptionsDto()
                            {
                                 Option = _context.Options.Where(x=>x.QuestionId == q.QuestionId).ToList(),
                                 Description=q.Description,
                                 FormFieldId= q.FormFieldId,
                                 Questions = _context.Questions.ToList(),
                                 QuestionId=q.QuestionId
                            }).OrderBy(x=>x.FormFieldId);
            return options.ToList();
        }

        // GET: api/GetAllFormFields
        [HttpGet("GetAllFormFields")]
        public async Task<ActionResult<IEnumerable<FormFields>>> GetAllFormFields()
        {
            return await _context.FormFields.ToListAsync();
        }

        // GET: api/GetAllOptionsWithQuestions
        [HttpGet("GetAllOptionsWithQuestions")]
        public async Task<ActionResult<IEnumerable<Options>>> GetAllOptionsWithQuestions()
        {
            var result = await _context.Options.Include(x => x.Questions).Include(x => x.FormFields).ToListAsync();
            return result;
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
        public async Task<ActionResult<Questions>> CreateQuestion(OptionsDto[] questions)
        {           
            Questions questions1 = new Questions();
            bool isRowSaved = false;
            if (questions.Length > 0)
            {
                foreach (var q in questions)
                {
                    Options options1 = new Options();
                    if (!isRowSaved)
                    {
                        questions1.Description = q.Description;
                        questions1.FormFieldId = q.FormFieldId;
                        _context.Questions.Add(questions1);
                        await _context.SaveChangesAsync();
                        isRowSaved = true;
                    }
                    if (q.FormFieldId != 1)
                    {
                        options1.OptionText = q.OptionText;
                        options1.IsCorrect = q.IsCorrect;
                        options1.FormFieldId = q.FormFieldId;
                        options1.QuestionId = questions1.QuestionId;

                        _context.Options.Add(options1);
                        await _context.SaveChangesAsync();
                    }
                }
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
