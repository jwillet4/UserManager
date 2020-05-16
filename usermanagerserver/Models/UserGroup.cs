using System;

namespace webapi.Models
{
    public class UserGroup
    {
        public int? uid { get; set; }
        public int? gid { get; set; }

        public UserGroup(int uid, int gid) {
            this.uid = uid;
            this.gid = gid;
        }

        public UserGroup() 
        {
            
        }
    }
}