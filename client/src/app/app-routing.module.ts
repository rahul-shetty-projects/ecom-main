import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'dashboard',
    pathMatch : 'full'
  },
  {
    path : 'auth',
    loadChildren: () => import('./auth/auth.module').then(
      (m) => m.AuthModule
    )
  },
  {
    path : 'dashboard',
    loadChildren: () => import('./views/dashboard/dashboard.module').then(
      (m) => m.DashboardModule
    ),
    canActivate: [AuthGuard]
  },
  {
    path : '**',
    redirectTo : 'dashboard',
    pathMatch :  'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
