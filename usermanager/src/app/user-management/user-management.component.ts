import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { logWarnings } from 'protractor/built/driverProviders';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { Title } from '@angular/platform-browser';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  public users: Array<User>; 

  public formGroup: FormGroup;

  private editedRowIndex: number;

  constructor(private titleService: Title, private userService: UserService) {
    titleService.setTitle('User Manager');
  }

  ngOnInit(): void {
    this.userService.users.subscribe(users => this.users = users);
  }

  public addHandler({sender}) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      'first_name': new FormControl('', Validators.compose([Validators.required, Validators.max(45)])),
      'last_name': new FormControl('', Validators.compose([Validators.required, Validators.max(45)])),
      'email': new FormControl('', Validators.compose([Validators.required, Validators.max(45)])),
    });

    sender.addRow(this.formGroup);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  public saveHandler({sender, rowIndex, formGroup, isNew}) {
    const user: User = formGroup.value;
    
    //Add service call to add new user
    this.users.push(user);

    sender.closeRow(rowIndex);
  }

  public cancelHandler({sender, rowIndex}) {
    this.closeEditor(sender, rowIndex);
  }

  public removeHandler({dataItem}) {
    this.users = this.users.filter(function( user ) {
      return user !== dataItem;
    });

    //Add service call to hit api
  }
}
