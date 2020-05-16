import { Injectable } from '@angular/core';
import { UserGroup, UserGroupChangeDTO } from '../models/user-group';
import { Group } from '../models/group';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  //Observable for groups list
  private groupSource: BehaviorSubject<Array<Group>>;
  public groups;

  //Observable for usergroups list
  private userGroupSource: BehaviorSubject<Array<UserGroup>>;
  public userGroups;

  //Info to send http requests to api
  private httpClient: HttpClient;
  private baseUrl: string;

  constructor(private http: HttpClient) { 
    //Observable for user data
    this.groupSource = new BehaviorSubject<Array<Group>>([]);
    this.groups = this.groupSource.asObservable();

    this.userGroupSource = new BehaviorSubject<Array<UserGroup>>([]);
    this.userGroups = this.userGroupSource.asObservable();

    this.httpClient = http;
    this.baseUrl = "https://localhost:5001/group"

    //Pulls groups and usergroups data
    this.getGroups();
    this.getUserGroups();
  }

  //Fetches list of existing groups
  public getGroups(): void {
    this.httpClient.get<Array<Group>>(this.baseUrl).subscribe(result => {
      this.groupSource.next(result);
    }, error => {
      console.log(error);
    });
  }

  //Fetches list of usergroups
  public getUserGroups(): void {
    this.httpClient.get<Array<UserGroup>>(this.baseUrl + "/UserGroups").subscribe(result => {
      this.userGroupSource.next(result);
    }, error => {
      console.log(error);
    });
  }

  //Adds a new group to assign to users
  public addGroup(group: string): void {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    this.httpClient.post<Array<Group>>(this.baseUrl + '/AddGroup', new Group(group), { headers }).subscribe( result => {
      this.groupSource.next(result);
    }, error => {
      console.log(error)
    });
  }

  //Deletes given group from database
  public removeGroup(group: Group): void {
    const httpParams = new HttpParams().set('groupId', group.id.toString());
    this.httpClient.delete<Array<Group>>(this.baseUrl + '/DeleteGroup', { params: httpParams }).subscribe( result => {
      this.groupSource.next(result);
      this.getUserGroups();
    }, error => {
      console.log(error)
    });
  }

  //Changes users group to new selected group
  public editUserGroup(userGroup: UserGroup, newGroup: Group): void {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    this.httpClient.put<Array<UserGroup>>(this.baseUrl + '/ChangeGroup', new UserGroupChangeDTO(userGroup.uid, newGroup.id), { headers }).subscribe( result => {
      this.userGroupSource.next(result);
      console.log(result)
    }, error => {
      console.log(error)
    });
  }

}
