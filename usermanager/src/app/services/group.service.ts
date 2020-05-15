import { Injectable } from '@angular/core';
import { UserGroup } from '../models/user-group';
import { Group } from '../models/group';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groupSource: BehaviorSubject<Array<Group>>;
  public groups;

  private userGroupSource: BehaviorSubject<Array<UserGroup>>;
  public userGroups;

  constructor() { 
    this.groupSource = new BehaviorSubject<Array<Group>>([]);
    this.groups = this.groupSource.asObservable();

    this.userGroupSource = new BehaviorSubject<Array<UserGroup>>([]);
    this.userGroups = this.userGroupSource.asObservable();


    //temp data
    this.groupSource.next([
      {id: 1, name: "Goon"},
      {id: 2, name: "Jerk"},
    ]);

    this.userGroupSource.next([
      {id: 1, first_name: "Admin", last_name: "Adminson", group_name: "Goon"},
      {id: 2, first_name: "Logan", last_name: "Willett", group_name: "Goon"},
      {id: 3, first_name: "Test", last_name: "Test", group_name: "Jerk"},
    ]);

  }

  public addGroup(group: String): void {

  }

  public removeGroup(group: Group): void {

  }

  public editUserGroup(userGroup: UserGroup, newGroup: Group): void {
    
  }

}
