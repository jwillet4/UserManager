import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { LoginUser } from '../models/login-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  STORAGE_KEY = "authCookie";

  private authenticated: boolean;

  private loginUser: LoginUser;

  constructor(@Inject(LOCAL_STORAGE) private storage) {
    console.log("Test:", this.storage.get(this.STORAGE_KEY));
    this.storage.set(this.STORAGE_KEY, "test");
  }

  async authenticateUser(): Promise<LoginUser> {
    if (this.storage.get(this.STORAGE_KEY)) {
      //Send api call
    }
    else {
      //Redirect
    }

    
    return new Promise(null);
  }

  async login(email: string): Promise<boolean> {
    //Send api call, return true if auth
    return new Promise((res, rej) => {
      res(true);
    });
  }
}
