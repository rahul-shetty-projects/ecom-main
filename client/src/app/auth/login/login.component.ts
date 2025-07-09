import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService , NotificationService } from '../../services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  formSubmitted = false;
  loading = false;

  constructor(private formBuilder : FormBuilder,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService : NotificationService) {
      if (this.authService.currentUserValue) {
        this.router.navigate(['/']);
        }
     }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm = this.formBuilder.group({
      userEmail : ['',[Validators.required,Validators.email]],
      userPassword : ['',[Validators.required]]
    })
  }

  get f(){ return this.loginForm.controls; }

  login(){
    this.formSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.spinner.show();
    this.authService.login(this.loginForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.notificationService.showSuccess("",data.message);
                    this.router.navigate(['/dashbaord']);
                    this.spinner.hide();
                },
                error => {
                  this.spinner.hide();
                });
  }
  navbarClass = "topnav";
  responsive(){
    if(this.navbarClass == "topnav"){
      this.navbarClass = "topnav responsive"
    }else{
      this.navbarClass = "topnav";
    }
  }
}
