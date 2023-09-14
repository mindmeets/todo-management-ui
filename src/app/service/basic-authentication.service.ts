import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { API_URL, AUTHENTICATED_USER, TOKEN } from '../app.constants';

export class JWTBean {
  token: string = ''

  constructor() {
  }
}

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(
    private http: HttpClient,
    private handler: HttpBackend
  ) {
    this.http = new HttpClient(handler)
  }

  executeAuthenticationService(username: string, password: string) {
    // const basicAuthString = 'Basic ' + window.btoa(username + ':' + password)
    // const headers = new HttpHeaders({
    //   Authorization: basicAuthString
    // })
    return this.http.post<JWTBean>(`${API_URL}/login`, { username, password})
      .pipe(
        map(
          data => {
            console.log('Auth service===> ', data)
            sessionStorage.setItem(AUTHENTICATED_USER, username)
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`)
          }
        )
      )
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  getAuthenticatedUser() {
    if(this.isUserLoggedIn()) {
      return sessionStorage.getItem(AUTHENTICATED_USER) as string;
    }
    return ''
  }

  getAuthenticatedToken() {
    if(this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN);
    }
    return ''
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }
}
