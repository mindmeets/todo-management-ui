import { Component, OnInit } from '@angular/core';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { Router } from '@angular/router';
import { UserDataService } from '../service/data/user-data.service';

export class User {
  constructor(
    public username: string,
    public enabled: boolean,
    public admin: boolean
  ) {}
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: User[] = []
  deleteMessage: string = ''
  authenticatedUserName: string = ''

  constructor(
    private userDataService: UserDataService,
    private auth: BasicAuthenticationService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.authenticatedUserName = this.auth.getAuthenticatedUser()
    this.refreshUsers()
  }

  refreshUsers() {
    this.userDataService.retriveAllUsers().subscribe({
      next: response => {
        this.users = response
      },
      error: this.handleError
    })
  }

  deleteUser(username: string) {
    this.userDataService.deleteUser(username).subscribe({
      next: response => {
        this.deleteMessage = `Delete of User ${username} successful!`
        this.refreshUsers()
      },
      error: this.handleError
    })
  }

  updateUser(username: string) {
    this.router.navigate(['users', username])
  }

  addUser() {
    this.router.navigate(['users', ''])
  }

  handleError(error: any) {
    console.log('===>API failed: ', error)
    this.router.navigate(['error'])
  }
}
