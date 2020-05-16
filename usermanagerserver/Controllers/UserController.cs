using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using webapi.Models;
using webapi.Services;

namespace usermanagerserver.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private UserService _us;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
            _us = new UserService();
        }

        [HttpGet]
        public List<User> Get()
        {
            return _us.getUsers();
        }

        [HttpPost("[action]")]
        public List<User> AddUser(User user) 
        {
            return _us.addUser(user);
        }

        [HttpDelete("[action]")]
        public List<User> DeleteUser(int userId) 
        {
            return _us.deleteUser(userId);
        }

    }
}