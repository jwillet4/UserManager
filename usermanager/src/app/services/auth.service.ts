import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { LoginUser } from '../models/login-user';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  STORAGE_KEY = "authCookie";

  private authenticated: boolean;

  private loginUser: LoginUser;

  //Info to send http requests to api
  private httpClient: HttpClient;
  private baseUrl: string;

  constructor(@Inject(LOCAL_STORAGE) private storage, private http: HttpClient) {
    console.log("Test:", this.storage.get(this.STORAGE_KEY));
    this.storage.set(this.STORAGE_KEY, "test");
    this.storage.set(this.STORAGE_KEY, undefined);

    this.httpClient = http;
    this.baseUrl = "https://localhost:5001/login"

    this.authenticateUser();
  }

  async authenticateUser(): Promise<LoginUser> {
    if (this.storage.get(this.STORAGE_KEY)) {
      //Send api call
      const httpParams = new HttpParams().set('token', this.storage.get(this.STORAGE_KEY));
      const promise = this.httpClient.get<LoginUser>(this.baseUrl + '/LoginToken', { params: httpParams }).toPromise()
      //Handle promise and return
      promise.then((result) => {
        return result;
      }).catch((rej) => {
        console.log(rej)
      });
      return promise;
    }
    return null;
  }

  async login(email: string): Promise<LoginUser> {
    //Send api call
    const httpParams = new HttpParams().set('email', email);
    const promise = this.httpClient.get<LoginUser>(this.baseUrl + '/Login', { params: httpParams }).toPromise()
    //Handle promise and return
    promise.then((result) => {
      //Observables
      
      this.storage.set(this.STORAGE_KEY, result.token);
      return Promise.resolve(true);
    }).catch((rej) => {
      console.log(rej)
      return Promise.resolve(false)
    });
    return promise;
  }

}
