using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthenticationApp.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthenticationApp.Data
{
	public class AppDataContext : DbContext
	{
		public AppDataContext(DbContextOptions<AppDataContext> options) : base(options)
		{

		}
		public DbSet<Users> Users { get; set; }
		public DbSet<FormFields> FormFields  { get; set; }
		public DbSet<Questions> Questions{ get; set; }
		public DbSet<Options> Options { get; set; }
		public DbSet<SubmittedAnswers> SubmittedAnswers { get; set; }
    }
}
