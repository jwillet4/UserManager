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
  public addGroupName: string;

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
    this.groupService.addGroup(this.addGroupName)
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
    this.groupService.removeGroup(this.removeGroup)
    this.closeRemoveGroup();
  }

  public editHandler({dataItem}) {
    this.editUserGroup = dataItem;
    this.groups.push(new Group("-None-", -1));
    this.openEditGroup();
  }

  public closeEditGroup() {
    this.editGroupOpened = false;
    this.editGroup = undefined;
    this.editUserGroup = undefined;
    this.groups.pop();
  }

  public openEditGroup() {
    this.editGroupOpened = true;
  }

  public submitEditGroup() {
    this.groupService.editUserGroup(this.editUserGroup, this.editGroup);
    this.closeEditGroup();
  }

}
