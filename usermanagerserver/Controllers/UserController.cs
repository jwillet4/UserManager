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
        //Database context
        private UserService _us;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
            _us = new UserService();
        }

        ///<summary>
        ///Searches the database for all user entries
        ///</summary>
        ///<returns>
        ///A list of users
        ///</returns>
        [HttpGet]
        public List<User> Get()
        {
            return _us.getUsers();
        }

        ///<summary>
        ///Adds a user to the database
        ///</summary>
        ///<param name="user">A User object</param>
        ///<returns>
        ///A list of users
        ///</returns>
        [HttpPost("[action]")]
        public List<User> AddUser(User user) 
        {
            return _us.addUser(user);
        }

        ///<summary>
        ///Deletes a user from the database
        ///</summary>
        ///<param name="userId">Integer id of user</param>
        ///<returns>
        ///A list of Users
        ///</returns>
        [HttpDelete("[action]")]
        public List<User> DeleteUser(int userId) 
        {
            return _us.deleteUser(userId);
        }

    }
}