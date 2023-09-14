import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicAuthenticationService } from '../basic-authentication.service';
import { API_URL } from 'src/app/app.constants';
import { User } from 'src/app/list-users/list-users.component';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private http: HttpClient,
    private basicAuthService: BasicAuthenticationService
  ) { }
  
  changePassword(oldPassword: string, newPassword: string) {
    return this.http.post(`${API_URL}/users/${this.basicAuthService.getAuthenticatedUser()}`, { oldPassword, newPassword})
  }
  
  retriveAllUsers() {
    return this.http.get<User[]>(`${API_URL}/users`)
  }

  deleteUser(username: string) {
    return this.http.delete(`${API_URL}/users/${username}`)
  }

  retriveUser(username: string) {
    return this.http.get<User>(`${API_URL}/users/${username}`)
  }

  updateUser(username: string, user: User) {
    return this.http.put<User>(`${API_URL}/users/${username}`, user)
  }

  createUser(user: User) {
    return this.http.post(`${API_URL}/users`, user)
  }
}
