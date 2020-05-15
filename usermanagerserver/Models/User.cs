using System;

namespace webapi.Models
{
    public class User
    {
        public int id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }

        public User(int id, string firstName, string lastName, string email) {
            this.id = id;
            this.first_name = firstName;
            this.last_name = lastName;
            this.email = email;
        }

        public User() 
        {
            
        }
    }
}