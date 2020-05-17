import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string;

  constructor(private titleService: Title, private authService: AuthService) { 
    //Sets page title
    titleService.setTitle('Login');
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.email).then(res => {
      console.log(res);
      //Redirect to home page
    }).catch(rej => {
      console.log("Authentication failed");
      //Add visible message
    });
  }

}
