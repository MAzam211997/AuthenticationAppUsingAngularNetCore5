using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace AuthenticationApp.Models
{
	public class Users:IdentityUser
	{
		[Key]
		public int UserId { get; set; }
		public String Fullname { get; set; }
		public String Email { get; set; }
		public String Password { get; set; }
		public String PictureName { get; set; }
		public DateTime DateOfBirth { get; set; }
	}
}
