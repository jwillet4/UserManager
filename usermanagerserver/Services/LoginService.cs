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
            if (_dc.Token.Any(o => o.token == token))
            {
                return _dc.Token.Join(
                    _dc.User,
                    login => login.uid,
                    user => user.id,
                    (login, user) => new LoginUser 
                    {
                        uid = user.id,
                        first_name = user.first_name,
                        last_name = user.last_name,
                        email = user.email,
                        admin_status = user.id == 1 ? true : false,
                        token = login.token
                    }
                ).Single();
            }
            else
            {
                return new LoginUser();
            }
        }
    }
}