using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AuthenticationApp.Models
{
	public class Users
	{
		[Key]
		public int UserId { get; set; }
		public String Fullname { get; set; }
		public String Email { get; set; }
		public String Password { get; set; }
		public DateTime DateOfBirth { get; set; }
	}
}
