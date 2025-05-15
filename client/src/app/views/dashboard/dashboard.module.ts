import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxTypeaheadModule } from 'ngx-typeahead';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { OrderComponent } from './order/order.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { MyordersComponent } from './myorders/myorders.component';
import { ThanksorderComponent } from './thanksorder/thanksorder.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  declarations: [
    DashboardComponent,
    OrderComponent,
    ProfileComponent,
    AdminComponent,
    MyordersComponent,
    ThanksorderComponent,
    ProductDetailsComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule,
    NgxSpinnerModule,
    NgxTypeaheadModule
  ]
})
export class DashboardModule { }
