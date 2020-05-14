import { Component, OnInit, ViewChild } from '@angular/core';
import { UserGroup } from '../models/user-group';
import { Group } from '../models/group';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  public formGroup: FormGroup;
  public currentGroup: string;

  @ViewChild(GridComponent)
  private grid: GridComponent;
  private editedRowIndex: number;

  constructor(private titleService: Title) { 
    titleService.setTitle('Group Manager');

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

  public cellClickHandler({ isEdited, dataItem, rowIndex }): void {
    if (isEdited || (this.formGroup && !this.formGroup.valid)) {
        return;
    }

    this.closeEditor();

    this.formGroup = new FormGroup({
      'group_name': new FormControl(),
    });
    this.currentGroup = dataItem.group_name;
    this.editedRowIndex = rowIndex;

    this.grid.editRow(rowIndex, this.formGroup);
  }

  public onGroupChange(e) {
    //Push chang to group via api call
    console.log(e)
    this.formGroup.controls.group_name.setValue(undefined);
    this.closeEditor();
  }

  public closeEditor(): void {
    this.grid.closeRow(this.editedRowIndex);
    this.editedRowIndex = undefined;
    this.currentGroup = undefined;
    this.formGroup = undefined;
  }

}
