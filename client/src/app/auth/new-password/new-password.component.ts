import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { first } from 'rxjs/operators';
import { AuthService, NotificationService } from 'src/app/services';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  passwordForm !:FormGroup;
  showPassword : Boolean = false;
  formSubmitted = false;
  otp:any;

  constructor(private authService : AuthService,
    private formBuilder : FormBuilder,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private notificationService : NotificationService,
    private router: Router) { }

  ngOnInit(): void {
    this.otp = this.route.snapshot.params.otp;
    this.createForm();
  }

  createForm(){
    this.passwordForm = this.formBuilder.group({
      userPassword : ['',[Validators.required,Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword : ['',[Validators.required,Validators.minLength(8),]],
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


  get f(){ return this.passwordForm.controls; }
  newPassword(){
    this.formSubmitted = true;
    if(this.passwordForm.invalid){
      return;
    }
    this.spinner.show();
    delete this.passwordForm.value.confirmPassword;
    this.authService.setNewPassword(this.otp,this.passwordForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.notificationService.showSuccess("",data.message);
                    this.router.navigate(['/auth/login']);
                    this.spinner.hide();
                },
                error => {
                  this.spinner.hide();
                });
  }


  toggleshowPassword(){
    this.showPassword = !this.showPassword;
  }

}
