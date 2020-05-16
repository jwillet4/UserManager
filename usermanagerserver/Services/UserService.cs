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

        private UserManagementContext _dc;

        public UserService() 
        {
            _dc = new UserManagementContext();
        }

        public List<User> getUsers() {
            return _dc.User.ToList();
        }

        public List<User> addUser(User user) 
        {
            _dc.User.Add(user);
            _dc.SaveChanges();
            return _dc.User.ToList();
        }

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