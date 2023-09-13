import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  username = ''
  password = ''
  errorMessage = 'Invalid Credentials'
  invalidLogin = false

  constructor(
    private router: Router,
    private basicAuth: BasicAuthenticationService
  ) {

  }
  ngOnInit(): void {
  }

  handleBasicAuth() {
    this.basicAuth.executeAuthenticationService(this.username, this.password)
      .subscribe({
        next: res => {
          console.log('Auth res==> ', res)
          this.invalidLogin = false
          this.router.navigate(['welcome', this.username])
        },
        error: error => {
          console.log('Auth error===> ', error)
          this.invalidLogin = true
        }
     });
  }

  handleClear() {
    this.username = ''
    this.password = ''
  }
}
