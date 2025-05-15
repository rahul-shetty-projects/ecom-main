import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

import { environment } from '../../environments/environment';

import { User } from '../models/user';
import { NotificationService } from '../services/index';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper = new JwtHelperService();
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private cartUpdateSource = new BehaviorSubject('true');
  currentCart = this.cartUpdateSource.asObservable();
  
  constructor(private http: HttpClient,
    private router: Router,private notificationService : NotificationService) {
      if(localStorage.getItem('token')){
      this.currentUserSubject = new BehaviorSubject<User>(this.helper.decodeToken(localStorage.getItem('token') || '{}'));
        this.currentUser = this.currentUserSubject.asObservable();
      }else{
        this.currentUserSubject = new BehaviorSubject<User>(null!);
        this.currentUser = this.currentUserSubject.asObservable();
      }
    }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
    }

    // public get currentCartValue(){
    //   return this.cartUpdateSource.value;
    // }
    changeCart(change : any) {
      this.cartUpdateSource.next(change);
    }

    login(data:any){
      return this.http.post<any>(`${environment.apiUrl}/auth/login`,data)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                let decodedToken = this.helper.decodeToken(user.token);
                localStorage.setItem('token',user.token);
                this.currentUserSubject.next(decodedToken);
                return user;
            }));
    }

    getCartCount(id:any){
      return this.http.get<any>(`${environment.apiUrl}/user/get-cart-count/${id}`)
            .pipe(map(user => {
                return user;
            }));
    }

    register(data:any){
      return this.http.post<any>(`${environment.apiUrl}/auth/register`,data)
            .pipe(map(user => {
                return user;
            }));
    }

    confirmAccount(confirmationCode:any){
      return this.http.get(`${environment.apiUrl}/auth/confirm/${confirmationCode}`);
    }
    forgotPassword(data:any){
      return this.http.post<any>(`${environment.apiUrl}/auth/forgot-password`,data)
            .pipe(map(user => {
              return user;
            }));
    }
    setNewPassword(otp:any,data:any){
      return this.http.post<any>(`${environment.apiUrl}/auth/confirm-forgot-password-otp/${otp}`,data)
            .pipe(map(user => {
              return user;
            }));
    }

    getAllUsers(){
      return this.http.get<any>(`${environment.apiUrl}/auth/all-users`)
            .pipe(map(user => {
              return user;
            }));
    }

    addToCart(data:any){
      return this.http.post<any>(`${environment.apiUrl}/user/add-to-cart`,data)
            .pipe(map(user => {
              return user;
            }));
    }

    getMyCart(id:any){
      return this.http.get<any>(`${environment.apiUrl}/user/get-cart-products/${id}`)
            .pipe(map(user => {
                return user;
            }));
    }

    removeFromCart(userid:any,id:any){
      return this.http.delete<any>(`${environment.apiUrl}/user/remove-from-cart/${userid}/${id}`)
            .pipe(map(user => {
                return user;
            }));
    }

    newPassword(data:any){
      return this.http.post<any>(`${environment.apiUrl}/auth/new-password`,data)
            .pipe(map(user => {
              return user;
            }));
    }

    logout() {
      // this.http.get<any>(`${environment.apiUrl}/user/logout`).subscribe((data:any)=>{
        // remove user from local storage and set current user to null
        localStorage.removeItem('token');
        this.currentUserSubject.next(null!);
        this.notificationService.showSuccess("Logout Successfully","");
        this.router.navigate(['/auth/login']);
      // })           
  }
}
