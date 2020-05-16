using System;

namespace webapi.Models
{
    public class Group
    {
        public int id { get; set; }
        public string name { get; set; }
        
        public Group(int id, string name) {
            this.id = id;
            this.name = name;
        }

        public Group() 
        {
            
        }
    }
}