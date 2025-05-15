import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

import { AuthService } from '../services/index';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private router: Router,
    private authService : AuthService) { }
  helper = new JwtHelperService();
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let token  : any = localStorage.getItem('token');
    // token = JSON.parse(token);
    const decodedToken = this.helper.decodeToken(token);
    let validity = this.helper.isTokenExpired(token);
    if (token != null && validity == false) {
      return true;
    }
    else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
  // canActivateChild(
  //   childRoute: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //     let token : any = this.authService.currentUserValue;
  //     const decodedToken = this.helper.decodeToken(token.token);
  //     let validity = this.helper.isTokenExpired(token.token);
  //     if (token != null && validity == false) {
  //       if (
  //         (childRoute.data.roles && token.actions.includes(childRoute.data.roles[0])) ||
  //         token.actions.includes(childRoute.data.roles[1])
  //       ) {
  //         return true;
  //       } else {
  //         this.router.navigate(['/dashboard']);
  //         return false;
  //       }
  //     } else {
  //       this.authService.logout();
  //       return false;
  //     }
  // }
  
}
