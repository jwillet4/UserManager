import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { LoginUser } from './models/login-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'usermanager';

  public loginUser: LoginUser;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    //Subscribes to observables in AuthService
    this.authService.loginUser.subscribe(user => this.loginUser = user);
  }

  public logout(): void {
    this.authService.logout();
  }
}
