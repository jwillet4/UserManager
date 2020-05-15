import { Component, OnInit, ViewChild } from '@angular/core';
import { UserGroup } from '../models/user-group';
import { Group } from '../models/group';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { AddEvent, EditEvent, GridComponent } from '@progress/kendo-angular-grid';
import { groupBy, GroupDescriptor } from '@progress/kendo-data-query';
import { Title } from '@angular/platform-browser';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss']
})
export class GroupManagementComponent implements OnInit {

  public user_groups: Array<UserGroup>; 
  public groups: Array<Group>; 

  @ViewChild(GridComponent)
  private grid: GridComponent;
  private editedRowIndex: number;

  public addGroupOpened: Boolean;
  public addGroupName: String;

  public removeGroupOpened: Boolean;
  public removeGroup: Group;

  public editGroupOpened: Boolean;
  public editGroup: Group;
  private editUserGroup: UserGroup;

  constructor(private titleService: Title, private groupService: GroupService) { 
    titleService.setTitle('Group Manager');

    this.addGroupOpened = false;
    this.removeGroupOpened = false;
    this.editGroupOpened = false;
    //Pull user data
    //Pull group data
  }

  ngOnInit(): void {
    this.groupService.groups.subscribe(groups => this.groups = groups);
    this.groupService.userGroups.subscribe(user_groups => this.user_groups = user_groups);
  }
  
  public addHandler({sender}) {
    this.openAddGroup();
  }

  public closeAddGroup() {
    this.addGroupOpened = false;
    this.addGroupName = undefined;
  }

  public openAddGroup() {
    this.addGroupOpened = true;
  }

  public submitAddGroup() {
    console.log(this.addGroupName);
    //add save call
    this.closeAddGroup();
  }

  public removeHandler({sender}) {
    this.openRemoveGroup();
  }

  public closeRemoveGroup() {
    this.removeGroupOpened = false;
    this.removeGroup = undefined;
  }

  public openRemoveGroup() {
    this.removeGroupOpened = true;
  }

  public submitRemoveGroup() {
    console.log(this.removeGroup);
    //add save call
    this.closeRemoveGroup();
  }

  public editHandler({dataItem}) {
    this.editUserGroup = dataItem;
    this.openEditGroup();
  }

  public closeEditGroup() {
    this.editGroupOpened = false;
    this.editGroup = undefined;
  }

  public openEditGroup() {
    this.editGroupOpened = true;
  }

  public submitEditGroup() {
    console.log(this.editGroup);
    //add save call
    this.closeEditGroup();
  }

}
