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




        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Options>(entity =>
        //    {
        //        entity.ToTable("Options");
        //        entity.Property(e => e.OptionId).HasColumnName("OptionId").ValueGeneratedOnAdd();
        //    });
        //}
    }
}
