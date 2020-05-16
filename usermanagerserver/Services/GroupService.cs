using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using webapi.Models;

namespace webapi.Services
{
    public class GroupService
    {

        private UserManagementContext _dc;

        public GroupService() 
        {
            _dc = new UserManagementContext();
        }

        public List<Group> getGroups()
        {
            return _dc.Group.ToList();
        }

        public List<Group> addGroup(Group group) 
        {
            Console.WriteLine(group.name);
            _dc.Group.Add(group);
            _dc.SaveChanges();
            return _dc.Group.ToList();
        }

        public List<Group> deleteGroup(int groupId) 
        {
            Group group = _dc.Group.Where(o => o.id == groupId).Single();
            _dc.Group.Attach(group);
            _dc.Group.Remove(group);
            _dc.SaveChanges();
            return _dc.Group.ToList();
        }

        public dynamic getUserGroups()
        {
            var firstJoin = from user in _dc.User
                join ug in _dc.UserGroup on user.id equals ug.uid into gj
                from sub in gj.DefaultIfEmpty()
                select new { uid = user.id, user.first_name, user.last_name, gid = sub.gid };
            var secondJoin = from userGroup in firstJoin
                join g in _dc.Group on userGroup.gid equals g.id into gj
                from sub in gj.DefaultIfEmpty()
                select new { uid = userGroup.uid, userGroup.first_name, userGroup.last_name, gid = sub.id, group_name = sub.name };
            return secondJoin;
        }

        public dynamic changeGroup(UserGroup ugc)
        {
            var dc = new UserManagementContext();

            if (dc.UserGroup.Any(o => o.uid == ugc.uid))
            {
                UserGroup ug = dc.UserGroup.Where(o => o.uid == ugc.uid).Single();
                dc.UserGroup.Attach(ug);
                dc.UserGroup.Remove(ug);
                dc.SaveChanges();
                dc.Add(ugc);
            }
            else
            {
                dc.Add(ugc);
            }
            dc.SaveChanges();
            return getUserGroups();
        }

    }
}