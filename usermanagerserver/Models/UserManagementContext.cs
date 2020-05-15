using Microsoft.EntityFrameworkCore;
using MySql.Data.EntityFrameworkCore.Extensions;
using webapi.Models;

namespace webapi.Models
{
  public class UserManagementContext : DbContext
  {
    public DbSet<User> User { get; set; }

    public UserManagementContext() 
    {

    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseMySQL("server=localhost;database=user_management;user=root;password=root");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<User>(entity =>
      {
        entity.HasKey(e => e.id);
        entity.Property(e => e.first_name).IsRequired();
        entity.Property(e => e.last_name).IsRequired();
        entity.Property(e => e.email).IsRequired();
      });

    //   modelBuilder.Entity<Book>(entity =>
    //   {
    //     entity.HasKey(e => e.ISBN);
    //     entity.Property(e => e.Title).IsRequired();
    //     entity.HasOne(d => d.Publisher)
    //       .WithMany(p => p.Books);
    //   });
    }
  }
}