import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { logWarnings } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  public users: Array<User>; 

  constructor() {
    this.users = [
      {id: 1, first_name: "Admin", last_name: "Adminson", email: "admin@admin.com"},
      {id: 2, first_name: "Logan", last_name: "Willett", email: "loganwillett96@gmail.com"},
      {id: 3, first_name: "Test", last_name: "Test", email: "test@gmail.com"},
    ];
  }

  ngOnInit(): void {
  }

}
