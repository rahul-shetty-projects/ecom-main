import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-bootstrap-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthRoutingModule } from './auth-routing.module';
import { ForgotComponent } from './forgot/forgot.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PasswordNewComponent } from './password-new/password-new.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    NewPasswordComponent,
    ConfirmComponent,
    PasswordNewComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class AuthModule { }
