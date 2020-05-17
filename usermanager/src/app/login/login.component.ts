import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //Bound to email input for login
  public email: string;

  constructor(private titleService: Title, private authService: AuthService, private router: Router, private notificationService: NotificationService) { 
    //Sets page title
    titleService.setTitle('Login');
  }

  ngOnInit(): void {
  }

  //Sends login request; if successful redirects user
  login(): void {
    this.authService.login(this.email).then(res => {
      if (res) {
        //Redirect to home page
        this.router.navigate(['/']);
      }
      else {
        this.errorNotification("Login failed")
      }
    }).catch(rej => {
      console.log(rej);
      this.errorNotification("Login failed")
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
