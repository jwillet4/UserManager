using Microsoft.EntityFrameworkCore;
using MySql.Data.EntityFrameworkCore.Extensions;
using webapi.Models;

namespace webapi.Models
{
  public class UserManagementContext : DbContext
  {
    public DbSet<User> User { get; set; }
    public DbSet<Group> Group { get; set; }
    public DbSet<UserGroup> UserGroup { get; set; }
    public DbSet<Token> Token { get; set; }

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

      modelBuilder.Entity<Group>(entity =>
      {
        entity.HasKey(e => e.id);
        entity.Property(e => e.name).IsRequired();
      });

      modelBuilder.Entity<UserGroup>(entity =>
      {
        entity.ToTable("user_group");
        entity.HasKey(e => e.uid);
        entity.HasKey(e => e.gid);
      });

      modelBuilder.Entity<Token>(entity =>
      {
        entity.HasKey(e => e.uid);
        entity.Property(e => e.token).IsRequired();
      });
    }
  }
}