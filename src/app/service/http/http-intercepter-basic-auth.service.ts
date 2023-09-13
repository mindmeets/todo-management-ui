import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor{

  constructor(private basicAuth: BasicAuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let jwtToken = this.basicAuth.getAuthenticatedToken() as string
    // if (!request.url.endsWith('authenticate') && token) {
      // let jwtToken = `Bearer ${token}`

      request = request.clone({
        setHeaders: {
          Authorization : jwtToken
        }
      })
    // }

    return next.handle(request)
  }
}
