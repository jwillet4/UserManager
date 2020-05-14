import { Component, OnInit, ViewChild } from '@angular/core';
import { UserGroup } from '../models/user-group';
import { Group } from '../models/group';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { AddEvent, EditEvent, GridComponent } from '@progress/kendo-angular-grid';
import { groupBy, GroupDescriptor } from '@progress/kendo-data-query';
import { Title } from '@angular/platform-browser';

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

  constructor(private titleService: Title) { 
    titleService.setTitle('Group Manager');

    this.addGroupOpened = false;

    this.user_groups = [
      {id: 1, first_name: "Admin", last_name: "Adminson", group_name: "Goon"},
      {id: 2, first_name: "Logan", last_name: "Willett", group_name: "Goon"},
      {id: 3, first_name: "Test", last_name: "Test", group_name: "Jerk"},
    ];

    this.groups = [
      {id: 1, name: "Goon"},
      {id: 2, name: "Jerk"},
    ];
    //Pull user data
    //Pull group data
  }

  ngOnInit(): void {
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
