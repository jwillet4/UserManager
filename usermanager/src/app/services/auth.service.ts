import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { LoginUser } from '../models/login-user';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  STORAGE_KEY = "authCookie";

  //Observable for user data
  private loginUserSource: BehaviorSubject<LoginUser>;
  public loginUser;

  //Info to send http requests to api
  private httpClient: HttpClient;
  private baseUrl: string;

  constructor(@Inject(LOCAL_STORAGE) private storage, private http: HttpClient, private router: Router, private notificationService: NotificationService) {
    //Set observables and values needed for http requests
    this.loginUserSource = new BehaviorSubject<LoginUser>(null);
    this.loginUser = this.loginUserSource.asObservable();

    this.httpClient = http;
    this.baseUrl = "https://localhost:5001/login"

    //Attempt to authenticate the user
    this.authenticateUser();
  }

  //Uses stored token to automatically send authentication request
  async authenticateUser(): Promise<LoginUser> {
    if (this.storage.get(this.STORAGE_KEY)) {
      //Send api call
      const httpParams = new HttpParams().set('token', this.storage.get(this.STORAGE_KEY));
      const promise = this.httpClient.get<LoginUser>(this.baseUrl + '/LoginToken', { params: httpParams }).toPromise()
      //Handle promise and return
      promise.then((result) => {
        this.loginUserSource.next(result);
        return result;
      }).catch((rej) => {
        console.log(rej)
      });
      return promise;
    }
    return null;
  }

  //Sends request to sign in via email associated with user
  async login(email: string): Promise<LoginUser> {
    //Send api call
    const httpParams = new HttpParams().set('email', email);
    const promise = this.httpClient.get<LoginUser>(this.baseUrl + '/Login', { params: httpParams }).toPromise()
    //Handle promise and return
    promise.then((result) => {
      if (result) {
        //Observables
        this.loginUserSource.next(result);
        //Set token
        this.storage.set(this.STORAGE_KEY, result.token);
        this.successNotification("Login successful, welcome");
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    }).catch((rej) => {
      console.log(rej)
      return Promise.resolve(false)
    });
    return promise;
  }

  //Sings user out, deletes locally stored token, deletes token stored in database
  public logout(): void {
    const httpParams = new HttpParams().set('uid', this.loginUserSource.value.uid.toString());
    this.httpClient.delete(this.baseUrl + '/Logout', { params: httpParams }).subscribe( result => {
      this.storage.clear(this.STORAGE_KEY);
      this.loginUserSource.next(null);
      this.router.navigate(['/login']);
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
