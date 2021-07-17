using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AuthenticationApp.Data;
using AuthenticationApp.Models;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Authorization;

namespace AuthenticationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDataContext _context;
        public static string imageName = "";
       public UsersController(AppDataContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            var logginUser = HttpContext.Session.GetString("user");
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUsers(int id)
        {
            var users = await _context.Users.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }



        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Users>> Register(Users users)
        {
            users.PictureName = imageName;
            _context.Users.Add(users);
            await _context.SaveChangesAsync();
            return Ok(users);
        }

        [HttpPost("{user}")]
        public async Task<ActionResult<Users>> Login(Users user)
        {
            var users = await _context.Users.Where(x=>x.Email.Equals(user.Email) && x.Password.Equals(user.Password)).FirstOrDefaultAsync();
            HttpContext.Session.SetString("user", users.Email);
            if (users == null)
            {
                return NotFound();
            }
            return Ok(users);
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id:int}")]
        //[Route("UpdateUser")]
        public async Task<ActionResult<Users>> UpdateUser(int id,[FromBody] Users userData)
        {

            if (id == 0)
            {
                return BadRequest();
            }
            var user = _context.Users.Find(id);
            user.Email = userData.Email;
            user.Fullname= userData.Fullname;
            user.DateOfBirth = userData.DateOfBirth;
            _context.Users.Update(user);
            //_context.Entry(userData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok(userData);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsersExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
        //[AllowAnonymous]
        [HttpPost("UploadPicture")]
        public async Task<IActionResult> UploadPicture()
        {
            var file = Request.Form.Files[0];
            var folderName = Path.Combine("Assets","Images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(),folderName);

            if (file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);
                imageName = fileName;
                using (var stream =new FileStream(fullPath,FileMode.Create))
                {
                   await file.CopyToAsync(stream);
                }
                return Ok(new { dbPath });
            }
            else
            {
                return BadRequest();
            }

        }
    }
}
