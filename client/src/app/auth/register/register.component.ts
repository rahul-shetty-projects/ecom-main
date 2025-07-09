import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService , NotificationService } from '../../services/index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm !: FormGroup;
  formSubmitted = false;
  loading = false;
  showPassword : Boolean = false;
  showBox: Boolean = false;
  
  Ocp: any = ['Doctor', 'Student', 'Engineer', 'Scientist'];

  constructor(private formBuilder : FormBuilder,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService : NotificationService) {
      if (this.authService.currentUserValue) {
        this.router.navigate(['/']);
        }
        this.showBox = false;
     }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.showBox = false;
    this.registerForm = this.formBuilder.group({
      firstName : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]],
      lastName : [''],
      userEmail : ['',[Validators.required,Validators.email]],
      userRole : ['customer'],
      occupation : [''],
      gender:[''],
      userMobile : ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      userPassword : ['',[Validators.required]],
      confirmPassword : ['',[Validators.required]],
      required:['',[Validators.required]]
    },{
      validator: this.MustMatch('userPassword', 'confirmPassword')
    })
  }

  MustMatch(password1: string, password2: string) {
    return (formGroup: FormGroup) => {
        const pass = formGroup.controls[password1];
        const confirmPass = formGroup.controls[password2];
        if (confirmPass.errors && !confirmPass.errors.mustMatch) {
            return;
        }

        // set error on confirmPass if validation fails
        if (pass.value !== confirmPass.value) {
              confirmPass.setErrors({ mustMatch: true });
        } else {
              confirmPass.setErrors(null);
        }
    }
  }

  get f(){ return this.registerForm.controls; }

  register(){
    this.formSubmitted = true;
    if(this.registerForm.invalid){
      return;
    }
    this.spinner.show();
    this.authService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.notificationService.showSuccess("",data.message);
                    // this.router.navigate(['/auth/login']);
                    this.showBox = true;
                    this.spinner.hide();
                },
                error => {
                  this.spinner.hide();
                });
  }
  

  togglePassword(){
    this.showPassword = !this.showPassword;
  }
  navbarClass = "topnav";
  responsive(){
    if(this.navbarClass == "topnav"){
      this.navbarClass = "topnav responsive"
    }else{
      this.navbarClass = "topnav";
    }
  }
  changeOcp(e:any){
    this.registerForm.value.occupation.setValue(e.target.value, {
      onlySelf: true
    })
  }
}
