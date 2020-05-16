using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using webapi.Models;

namespace usermanagerserver.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GroupController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;

        public GroupController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public List<Group> Get()
        {
            var dc = new UserManagementContext();
            return dc.Group.ToList();
        }

        [HttpPost("[action]")]
        public List<Group> AddGroup(Group group) 
        {
            var dc = new UserManagementContext();
            Console.WriteLine(group.name);
            dc.Group.Add(group);
            dc.SaveChanges();
            return dc.Group.ToList();
        }

        [HttpDelete("[action]")]
        public List<Group> DeleteGroup(int groupId) 
        {
            var dc = new UserManagementContext();
            Group group = dc.Group.Where(o => o.id == groupId).Single();
            dc.Group.Attach(group);
            dc.Group.Remove(group);
            dc.SaveChanges();
            return dc.Group.ToList();
        }

        [HttpGet("[action]")]
        public dynamic UserGroups()
        {
            var dc = new UserManagementContext();

            var firstJoin = from user in dc.User
                join ug in dc.UserGroup on user.id equals ug.uid into gj
                from sub in gj.DefaultIfEmpty()
                select new { uid = user.id, user.first_name, user.last_name, gid = sub.gid };
            var secondJoin = from userGroup in firstJoin
                join g in dc.Group on userGroup.gid equals g.id into gj
                from sub in gj.DefaultIfEmpty()
                select new { uid = userGroup.uid, userGroup.first_name, userGroup.last_name, gid = sub.id, group_name = sub.name };

            return secondJoin;
        }

        [HttpPut("[action]")]
        public dynamic ChangeGroup(UserGroup ugc)
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

            

            var firstJoin = from user in dc.User
                join ug in dc.UserGroup on user.id equals ug.uid into gj
                from sub in gj.DefaultIfEmpty()
                select new { uid = user.id, user.first_name, user.last_name, gid = sub.gid };
            var secondJoin = from userGroup in firstJoin
                join g in dc.Group on userGroup.gid equals g.id into gj
                from sub in gj.DefaultIfEmpty()
                select new { uid = userGroup.uid, userGroup.first_name, userGroup.last_name, gid = sub.id, group_name = sub.name };

            return secondJoin;
        }

    }
}