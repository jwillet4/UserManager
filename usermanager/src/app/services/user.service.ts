import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSource: BehaviorSubject<Array<User>>;
  public users;

  private httpClient: HttpClient;
  private baseUrl: string;

  constructor(private http: HttpClient) { 
    this.userSource = new BehaviorSubject<Array<User>>([]);
    this.users = this.userSource.asObservable();

    this.httpClient = http;
    this.baseUrl = "https://localhost:5001/user"

    this.getUsers();
  }

  public getUsers(): void {
    this.httpClient.get<Array<User>>(this.baseUrl).subscribe(result => {
      this.userSource.next(result);
    }, error => {
      console.log(error);
    });
  }

  public addUser(user: User): void {
    //add api call
    let tempUsers = this.userSource.value
    tempUsers.push(user);
    this.userSource.next(tempUsers);
  }

  public removeUser(user: User): void {
    //Add api call
    this.userSource.next(this.userSource.value.filter(function( tempUser ) { return tempUser !== user; }));
  }

}
