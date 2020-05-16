using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using webapi.Models;

namespace webapi.Services
{
    public class UserService
    {
        //Database context
        private UserManagementContext _dc;

        public UserService() 
        {
            _dc = new UserManagementContext();
        }

        //Returns list of all users from the database
        public List<User> getUsers() {
            return _dc.User.ToList();
        }

        //Adds a given user to the database; returns new list of users
        public List<User> addUser(User user) 
        {
            _dc.User.Add(user);
            _dc.SaveChanges();
            return _dc.User.ToList();
        }

        //Takes a user id and deletes that user from the database; returns new list of users
        public List<User> deleteUser(int userId) 
        {
            User user = _dc.User.Where(o => o.id == userId).Single();
            _dc.User.Attach(user);
            _dc.User.Remove(user);
            _dc.SaveChanges();
            return _dc.User.ToList();
        }

    }
}