import { Injectable } from '@angular/core';
import { UserGroup } from '../models/user-group';
import { Group } from '../models/group';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groupSource: BehaviorSubject<Array<Group>>;
  public groups;

  private userGroupSource: BehaviorSubject<Array<UserGroup>>;
  public userGroups;

  private httpClient: HttpClient;
  private baseUrl: string;

  constructor(private http: HttpClient) { 
    this.groupSource = new BehaviorSubject<Array<Group>>([]);
    this.groups = this.groupSource.asObservable();

    this.userGroupSource = new BehaviorSubject<Array<UserGroup>>([]);
    this.userGroups = this.userGroupSource.asObservable();

    this.httpClient = http;
    this.baseUrl = "https://localhost:5001/group"

    this.getGroups();
    this.getUserGroups();

    //temp data
    this.userGroupSource.next([
      {id: 1, first_name: "Admin", last_name: "Adminson", group_name: "Goon"},
      {id: 2, first_name: "Logan", last_name: "Willett", group_name: "Goon"},
      {id: 3, first_name: "Test", last_name: "Test", group_name: "Jerk"},
    ]);

  }

  public getGroups(): void {
    this.httpClient.get<Array<Group>>(this.baseUrl).subscribe(result => {
      this.groupSource.next(result);
    }, error => {
      console.log(error);
    });
  }

  public getUserGroups(): void {
    this.httpClient.get<Array<UserGroup>>(this.baseUrl + "/UserGroups").subscribe(result => {
      this.userGroupSource.next(result);
      console.log(result)
    }, error => {
      console.log(error);
    });
  }

  public addGroup(group: string): void {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    this.httpClient.post<Array<Group>>(this.baseUrl + '/AddGroup', new Group(group), { headers }).subscribe( result => {
      this.groupSource.next(result);
      //Cause UserGroup pull
    }, error => {
      console.log(error)
    });
  }

  public removeGroup(group: Group): void {
    const httpParams = new HttpParams().set('groupId', group.id.toString());
    this.httpClient.delete<Array<Group>>(this.baseUrl + '/DeleteGroup', { params: httpParams }).subscribe( result => {
      this.groupSource.next(result);
      //Cause UserGroup pull
    }, error => {
      console.log(error)
    });
  }

  public editUserGroup(userGroup: UserGroup, newGroup: Group): void {
    
  }

}
