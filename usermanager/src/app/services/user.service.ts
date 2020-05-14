import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSource: BehaviorSubject<Array<User>> = new BehaviorSubject<Array<User>>([]);
  public users;


  constructor() { 
    this.userSource = new BehaviorSubject<Array<User>>([]);
    this.users = this.userSource.asObservable();


    //Temp data
    this.userSource.next([
      {id: 1, first_name: "Admin", last_name: "Adminson", email: "admin@admin.com"},
      {id: 2, first_name: "Logan", last_name: "Willett", email: "loganwillett96@gmail.com"},
      {id: 3, first_name: "Test", last_name: "Test", email: "test@gmail.com"},
    ]);

  }
}
