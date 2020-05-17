import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { NotificationService } from '@progress/kendo-angular-notification';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Observable for user data
  private userSource: BehaviorSubject<Array<User>>;
  public users;

  //Info to send http requests to api
  private httpClient: HttpClient;
  private baseUrl: string;

  constructor(private http: HttpClient, private notificationService: NotificationService) { 
    this.userSource = new BehaviorSubject<Array<User>>([]);
    this.users = this.userSource.asObservable();

    this.httpClient = http;
    this.baseUrl = "https://localhost:5001/user"

    //Pulls user info
    this.getUsers();
  }

  //Fetches list of users
  public getUsers(): void {
    this.httpClient.get<Array<User>>(this.baseUrl).subscribe(result => {
      this.userSource.next(result);
    }, error => {
      console.log(error);
      this.errorNotification(error);
    });
  }

  //Adds a given user to the database
  public addUser(user: User): void {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    this.httpClient.post<Array<User>>(this.baseUrl + '/AddUser', user, { headers }).subscribe( result => {
      console.log(result)
      this.userSource.next(result);
    }, error => {
      console.log(error)
      this.errorNotification(error);
    });
  }

  //Removes a given user from the database
  public removeUser(user: User): void {
    const httpParams = new HttpParams().set('userId', user.id.toString());
    this.httpClient.delete<Array<User>>(this.baseUrl + '/DeleteUser', { params: httpParams }).subscribe( result => {
      this.userSource.next(result);
    }, error => {
      console.log(error)
      this.errorNotification(error);
    });
  }

  //NOTIFICATIONS

  //Displays a notification in case of success
  private successNotification(message: string): void {
    this.notificationService.show({
      content: message,
      cssClass: 'button-notification',
      hideAfter: 1500,
      animation: { type: 'fade', duration: 800 },
      position: { horizontal: 'center', vertical: 'top' },
      type: { style: 'success', icon: true },
      closable: false
    });
  }
  
  //Displays a notification in case of error
  private errorNotification(error: string): void {
    this.notificationService.show({
      content: 'Error: ' + error,
      cssClass: 'button-notification',
      hideAfter: 3000,
      animation: { type: 'fade', duration: 500 },
      position: { horizontal: 'center', vertical: 'top' },
      type: { style: 'error', icon: true },
      closable: false
    });
  }

}
