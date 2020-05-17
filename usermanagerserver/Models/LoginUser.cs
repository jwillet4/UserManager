using System;

namespace webapi.Models
{
    public class LoginUser
    {
        public int uid { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public Boolean admin_status { get; set; }

        public LoginUser(int uid, string firstName, string lastName, string email, Boolean admin_status) {
            this.uid = uid;
            this.first_name = firstName;
            this.last_name = lastName;
            this.email = email;
            this.admin_status = admin_status;
        }

        public LoginUser() 
        {
            
        }
    }
}