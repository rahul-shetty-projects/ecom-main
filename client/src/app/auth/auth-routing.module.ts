import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PasswordNewComponent } from './password-new/password-new.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'login',
    pathMatch :  'full'
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'forgot-password',
    component : ForgotComponent
  },
  {
    path : 'confirm-forgot-password-otp/:otp',
    component : NewPasswordComponent
  },
  {
    path : 'password-new',
    component : PasswordNewComponent
  },
  // {
  //   path : 'confirm-account/:otp',
  //   component : ConfirmComponent
  // },
  {
    path : "**",
    redirectTo : 'login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
