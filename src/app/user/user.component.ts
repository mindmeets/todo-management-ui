import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../service/data/user-data.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../list-users/list-users.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username: string = ''
  user: User = new User('', true, false)
  isNew: boolean = true

  constructor(
    private userDataService: UserDataService,
    private authService: BasicAuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.username = this.route.snapshot.params['username']
    if (this.username != '') {
      this.userDataService.retriveUser(this.username).subscribe(response => {
        this.user = response
        this.isNew = false
      })
    }
  }

  saveUser() {
    if (this.username != '') {
      this.userDataService.updateUser(this.username, this.user).subscribe({
        next: response => {
          console.log(response)
          this.router.navigate(['users'])
        },
        error: this.handleError
      })
    } else {
      this.userDataService.createUser(this.user).subscribe({
        next: response => {
        console.log(response)
        this.router.navigate(['users'])
        },
        error: this.handleError
      })
    }
  }

  handleError(error: any) {
    console.log('===>User create/update failed: ', error)
    this.router.navigate(['error'])
  }
}
