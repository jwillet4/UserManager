using System;

namespace webapi.Models
{
    public class Token
    {
        public int uid { get; set; }
        public string token { get; set; }
        
        public Token(int uid, string token) {
            this.uid = uid;
            this.token = token;
        }

        public Token() 
        {
            
        }
    }
}