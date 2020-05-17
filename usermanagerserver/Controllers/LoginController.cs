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
    public class LoginController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        //Database context
        private LoginService _us;

        public LoginController(ILogger<UserController> logger)
        {
            _logger = logger;
            _us = new LoginService();
        }

        ///<summary>
        ///Authenticates a user by token
        ///</summary>
        ///<param name="token">Token for user</param>
        ///<returns>
        ///LoginUser object
        ///</returns>
        [HttpGet("[action]")]
        public LoginUser LoginToken(string token)
        {
            return _us.loginToken(token);
        }

        ///<summary>
        ///Authenticates a user by email
        ///</summary>
        ///<param name="email">Email of the user</param>
        ///<returns>
        ///LoginUser object
        ///</returns>
        [HttpGet("[action]")]
        public LoginUser Login(string email)
        {
            return _us.login(email);
        }

        ///<summary>
        ///Removes active token for user authentication
        ///</summary>
        ///<param uid="email">Id of the user to be logged out</param>
        [HttpDelete("[action]")]
        public void Logout(int uid)
        {
            _us.logout(uid);
        }
    }
}