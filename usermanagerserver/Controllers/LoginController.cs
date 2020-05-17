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
    }
}