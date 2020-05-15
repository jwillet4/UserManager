using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using webapi.Models;

namespace usermanagerserver.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public List<User> Get()
        {
            var dc = new UserManagementContext();
            return dc.User.ToList();
        }

        [HttpPost("[action]")]
        public List<User> AddUser(User user) 
        {
            var dc = new UserManagementContext();
            dc.User.Add(user);
            dc.SaveChanges();
            return dc.User.ToList();
        }

        [HttpDelete("[action]")]
        public List<User> DeleteUser(User user) 
        {
            var dc = new UserManagementContext();
            dc.User.Attach(user);
            dc.User.Remove(user);
            dc.SaveChanges();
            return dc.User.ToList();
        }

        // [HttpGet("[action]")]
        // public List<User> Test()
        // {
        //     var dc = new UserManagementContext();
        //     return dc.User.ToList();
        // }
    }
}