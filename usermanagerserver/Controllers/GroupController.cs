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
            return dc.UserGroup.Join(
                dc.User,
                userGroup => userGroup.uid,
                user => user.id,
                (userGroup, user) => new
                {
                    id = user.id,
                    first_name = user.first_name,
                    last_name = user.last_name,
                    gid = userGroup.gid
                } 
            ).Join(
                dc.Group,
                userGroup => userGroup.gid,
                group => group.id,
                (userGroup, group) => new
                {
                    id = userGroup.id,
                    first_name = userGroup.first_name,
                    last_name = userGroup.last_name,
                    group_name = group.name
                } 
            ).ToList();
        }

    }
}