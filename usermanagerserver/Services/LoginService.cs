using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using webapi.Models;
using System.Text;

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

        //Grabs LoginUser with a matching token
        public LoginUser loginToken(string token) 
        {
            //Checks if token exists
            if (_dc.Token.Any(o => o.token == token))
            {
                //Creates LoginUser object with table entries
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
                ).Where(o => o.token == token).Single();
            }
            else
            {
                return null;
            }
        }

        public LoginUser login(string email) 
        {
            //Finds user are returns blank user if email does not exist
            User user;
            if (_dc.User.Any(o => o.email == email)) {
                user = _dc.User.Where(o => o.email == email).Single();
            }
            else 
            {
                return null;
            }
            //Checks if token exists for user; creates one if user doesn't have one
            Token token;
            string newToken = generateToken();
            if (_dc.Token.Any(o => o.uid == user.id))
            {
                token = _dc.Token.Where(o => o.uid == user.id).Single();
            }
            else
            {
                _dc.Token.Add(new Token(user.id, newToken));
                _dc.SaveChanges();
                token = new Token(0, newToken);
            }

            return new LoginUser(user.id, user.first_name, user.last_name, user.email, user.id == 1 ? true : false, token.token);
        }

        private string generateToken()
        {
            int length = 32;
      
            // creating a StringBuilder object()
            StringBuilder str_build = new StringBuilder();  
            Random random = new Random();  

            char letter;  

            for (int i = 0; i < length; i++)
            {
                double flt = random.NextDouble();
                int shift = Convert.ToInt32(Math.Floor(25 * flt));
                letter = Convert.ToChar(shift + 65);
                str_build.Append(letter);  
            }  
            return str_build.ToString();
        }

    }
}