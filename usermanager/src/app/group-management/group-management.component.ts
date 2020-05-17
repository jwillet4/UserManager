import { Component, OnInit, ViewChild } from '@angular/core';
import { UserGroup } from '../models/user-group';
import { Group } from '../models/group';
import { Title } from '@angular/platform-browser';
import { GroupService } from '../services/group.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss']
})
export class GroupManagementComponent implements OnInit {

  //Data from observables; used to populate grid and select group
  public user_groups: Array<UserGroup>; 
  public groups: Array<Group>;

  //Tracks Add Group window and selection
  public addGroupOpened: Boolean;
  public addGroupName: string;

  //Tracks Remove Group window and selection
  public removeGroupOpened: Boolean;
  public removeGroup: Group;

  //Tracks Change Group window and selection
  public editGroupOpened: Boolean;
  public editGroup: Group;
  private editUserGroup: UserGroup;

  constructor(private titleService: Title, private groupService: GroupService, private authService: AuthService, private router: Router) { 
    //Checks if user is authenticated
    authService.authenticateUser().then(res => {
      if (!res) {
        this.router.navigate(['/login']);
      }
    }).catch(rej => {
      this.router.navigate(['/login']);
    });
    
    //Sets page title
    titleService.setTitle('Group Manager');
    //Ensures all windows are closed at init
    this.addGroupOpened = false;
    this.removeGroupOpened = false;
    this.editGroupOpened = false;
  }

  ngOnInit(): void {
    //Subscribes to observables in GroupService
    this.groupService.groups.subscribe(groups => this.groups = groups);
    this.groupService.userGroups.subscribe(user_groups => this.user_groups = user_groups);
  }
  
  //Starts the Add Group process
  public addHandler({sender}) {
    this.openAddGroup();
  }

  //Closes Add Group window and resets associated vars
  public closeAddGroup() {
    this.addGroupOpened = false;
    this.addGroupName = undefined;
  }

  //Displays the Add Group window
  public openAddGroup() {
    this.addGroupOpened = true;
  }

  //Calls service to add new group
  public submitAddGroup() {
    this.groupService.addGroup(this.addGroupName)
    this.closeAddGroup();
  }

  //Starts the Remove Group process
  public removeHandler({sender}) {
    this.openRemoveGroup();
  }

  //Closes Remove Group window and resets associated vars
  public closeRemoveGroup() {
    this.removeGroupOpened = false;
    this.removeGroup = undefined;
  }

  //Displays the Remove Group window
  public openRemoveGroup() {
    this.removeGroupOpened = true;
  }

  //Calls service to remove existing group
  public submitRemoveGroup() {
    this.groupService.removeGroup(this.removeGroup)
    this.closeRemoveGroup();
  }

  //Starts the Change Group process
  public editHandler({dataItem}) {
    this.editUserGroup = dataItem;
    this.groups.push(new Group("-None-", -1));
    this.openEditGroup();
  }

  //Closes Choose Group window and resets associated vars
  public closeEditGroup() {
    this.editGroupOpened = false;
    this.editGroup = undefined;
    this.editUserGroup = undefined;
    this.groups.pop();
  }

  //Displays the Choose Group window
  public openEditGroup() {
    this.editGroupOpened = true;
  }

  //Calls service to assign the user to a group or -None-
  public submitEditGroup() {
    this.groupService.editUserGroup(this.editUserGroup, this.editGroup);
    this.closeEditGroup();
  }

}
