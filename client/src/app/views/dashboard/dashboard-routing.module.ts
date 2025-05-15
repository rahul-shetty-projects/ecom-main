import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/guards/role.guard';
import { DashboardComponent } from './dashboard.component';

import { Roles } from '../../models/roles';
import { OrderComponent } from './order/order.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { MyordersComponent } from './myorders/myorders.component';
import { ThanksorderComponent } from './thanksorder/thanksorder.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'dash',
    pathMatch :  'full'
  },
  {
    path: 'dash',
    component : DashboardComponent,
    // canActivate : [RoleGuard],
    data: {
      title: 'Dashbaord',
      // roles: [Roles.superAdmin,Roles.admin,Roles.careerCounselor,Roles.careerCounselor,Roles.candidate]
    }
  },
  {
    path: 'order',
    component :  OrderComponent,
    data : {
      title : 'Order'
    }
  },
  {
    path: 'cart',
    component :  ProfileComponent,
    data : {
      title : 'Cart'
    }
  },
  {
    path: 'admin',
    component :  AdminComponent,
    data : {
      title : 'Admin'
    }
  },
  {
    path: 'myorders',
    component :  MyordersComponent,
    data : {
      title : 'My Orders'
    }
  },
  {
    path: 'thanks',
    component :  ThanksorderComponent,
    data : {
      title : 'Thanks'
    }
  },
  {
    path: 'product-details/:id',
    component :  ProductDetailsComponent,
    data : {
      title : 'Product Details'
    }
  },
  {
    path: 'order-details/:id',
    component :  OrderDetailsComponent,
    data : {
      title : 'Order Details'
    }
  },
  {
    path : "**",
    redirectTo : 'dash'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
