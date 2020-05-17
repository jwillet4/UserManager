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
        //Database context
        private GroupService _gs;

        public GroupController(ILogger<UserController> logger)
        {
            _logger = logger;
            _gs = new GroupService();
        }

        ///<summary>
        ///Returns list of groups from database
        ///</summary>
        ///<returns>
        ///List of groups
        ///</returns>
        [HttpGet]
        public List<Group> Get()
        {
            return _gs.getGroups();
        }

        ///<summary>
        ///Adds a new group to the database
        ///</summary>
        ///<param name="group">Group object</param>
        ///<returns>
        ///List of groups
        ///</returns>
        [HttpPost("[action]")]
        public List<Group> AddGroup(Group group) 
        {
            return _gs.addGroup(group);
        }

        ///<summary>
        ///Deletes given group from the database
        ///</summary>
        ///<param name="groupId">Integer group id</param>
        ///<returns>
        ///A list of groups
        ///</returns>
        [HttpDelete("[action]")]
        public List<Group> DeleteGroup(int groupId) 
        {
            return _gs.deleteGroup(groupId);
        }

        ///<summary>
        ///Fetches a list of usergroups from the database
        ///</summary>
        ///<returns>
        ///List of usergroups
        ///</returns>
        [HttpGet("[action]")]
        public dynamic UserGroups()
        {
            return _gs.getUserGroups();
        }

        ///<summary>
        ///Changes a users assigned group to given groupId. -1 removes any existing group assignment
        ///</summary>
        ///<param name="ugc">UserGroup object</param>
        ///<returns>
        ///A list of UserGroup objects
        ///</returns>
        [HttpPut("[action]")]
        public dynamic ChangeGroup(UserGroup ugc)
        {
            return _gs.changeGroup(ugc);
        }

    }
}