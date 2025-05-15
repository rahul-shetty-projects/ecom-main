import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = localStorage.getItem('token');
    const isLoggedIn = user;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if(isLoggedIn){
      request = request.clone({
        setHeaders : {
          Authorization : `${user}`
        }
      });
    }
    return next.handle(request);
  }
}
