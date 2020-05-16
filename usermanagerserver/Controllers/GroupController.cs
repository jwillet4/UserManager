using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using webapi.Models;
using webapi.Services;

namespace usermanagerserver.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GroupController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private GroupService _gs;

        public GroupController(ILogger<UserController> logger)
        {
            _logger = logger;
            _gs = new GroupService();
        }

        [HttpGet]
        public List<Group> Get()
        {
            return _gs.getGroups();
        }

        [HttpPost("[action]")]
        public List<Group> AddGroup(Group group) 
        {
            return _gs.addGroup(group);
        }

        [HttpDelete("[action]")]
        public List<Group> DeleteGroup(int groupId) 
        {
            return _gs.deleteGroup(groupId);
        }

        [HttpGet("[action]")]
        public dynamic UserGroups()
        {
            return _gs.getUserGroups();
        }

        [HttpPut("[action]")]
        public dynamic ChangeGroup(UserGroup ugc)
        {
            return _gs.changeGroup(ugc);
        }

    }
}