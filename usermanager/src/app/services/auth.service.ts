import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  STORAGE_KEY = "authCookie";

  constructor(@Inject(LOCAL_STORAGE) private storage) {
    console.log("Test:", this.storage.get(this.STORAGE_KEY));
    this.storage.set(this.STORAGE_KEY, "test");
  }

  authenticateUser(): Boolean {


    return false;
  }
}
