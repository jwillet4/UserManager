import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { logWarnings } from 'protractor/built/driverProviders';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { Title } from '@angular/platform-browser';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  //Observed from user service; used to populate the grid
  public users: Array<User>; 

  //Tracks form group to add new user
  public formGroup: FormGroup;

  //Tracks row index when editing
  private editedRowIndex: number;

  constructor(private titleService: Title, private userService: UserService, private authService: AuthService) {
    //Sets page title
    titleService.setTitle('User Manager');
  }

  ngOnInit(): void {
    //Subscribes to observable in user service
    this.userService.users.subscribe(users => this.users = users);
  }

  //Opens inline editor and creates corresponding form
  public addHandler({sender}) {
    this.closeEditor(sender);
    this.formGroup = new FormGroup({
      'first_name': new FormControl('', Validators.compose([Validators.required, Validators.max(45)])),
      'last_name': new FormControl('', Validators.compose([Validators.required, Validators.max(45)])),
      'email': new FormControl('', Validators.compose([Validators.required, Validators.max(45)])),
    });
    sender.addRow(this.formGroup);
  }

  //Closes the in grid editor and resets vars
  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  //Calls user service to add new user
  public saveHandler({sender, rowIndex, formGroup, isNew}) {
    const user: User = formGroup.value;
    this.userService.addUser(user);
    sender.closeRow(rowIndex);
  }

  //Closes inline editor
  public cancelHandler({sender, rowIndex}) {
    this.closeEditor(sender, rowIndex);
  }

  //Calls user service to remove selected user
  public removeHandler({dataItem}) {
    this.userService.removeUser(dataItem);
  }
}
