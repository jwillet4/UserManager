import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string;

  constructor(private titleService: Title, private authService: AuthService, private router: Router) { 
    //Sets page title
    titleService.setTitle('Login');
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.email).then(res => {
      if (res) {
        //Redirect to home page
        this.router.navigate(['/']);
      }
      else {
        alert("Login failed");
      }
    }).catch(rej => {
      console.log(rej);
      alert("Login failed");
    });
  }

}
