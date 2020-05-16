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

    }
}