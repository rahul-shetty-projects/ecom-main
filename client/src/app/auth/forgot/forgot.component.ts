import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { AuthService, NotificationService } from 'src/app/services';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  forgotForm !: FormGroup;
  formSubmitted = false;

  constructor(private formBuilder : FormBuilder,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService : NotificationService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.forgotForm = this.formBuilder.group({
      userEmail : ['',[Validators.required,Validators.email]],
    })
  }

  get f(){ return this.forgotForm.controls; }

  forgotPassword(){
    this.formSubmitted  = true;
    if(this.forgotForm.invalid){
      return;
    }
    this.spinner.show();
    this.authService.forgotPassword(this.forgotForm.value)
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
}
