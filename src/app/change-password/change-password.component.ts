import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { UserDataService } from '../service/data/user-data.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  invalidCredentials: boolean = false
  errorMessage: string = 'Invalid Credentials!'
  changePassSuccess: boolean = false
  successMessage: string = 'Password changed successfully! We suggest, Please logout and login again..'
  oldPassword: string = ''
  newPassword: string = ''

  constructor(
    private router: Router,
    private basicAuth: BasicAuthenticationService,
    private userDataService: UserDataService
  ) {

  }

  handleChangePassword() {
    this.basicAuth.executeAuthenticationService(this.basicAuth.getAuthenticatedUser(), this.oldPassword)
      .subscribe({
        next: res => {
          console.log('Auth res==> ', res)
          this.invalidCredentials = false
          this.userDataService.changePassword(this.oldPassword, this.newPassword)
            .subscribe({
              next: res => {
                console.log('Change Password res==> ', res)
                this.changePassSuccess = true
                this.handleClear()
              },
              error: error => {
                console.log('Change password error===> ', error)
                this.changePassSuccess = false
                this.router.navigate(['error'])
              }
            })
        },
        error: error => {
          console.log('Auth error===> ', error)
          this.invalidCredentials = true
          this.changePassSuccess = false
        }
     });
  }
  
  handleClear() {
    this.oldPassword = ''
    this.newPassword = ''
  }
}
