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
	}
}
