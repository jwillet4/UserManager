using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using webapi.Models;

namespace webapi.Services
{
    public class LoginService
    {
        //Database context
        private UserManagementContext _dc;

        public LoginService() 
        {
            _dc = new UserManagementContext();
        }

        public LoginUser loginToken(string token) 
        {
            return null;
        }
    }
}