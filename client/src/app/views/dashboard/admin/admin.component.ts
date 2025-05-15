import { Component, OnInit } from '@angular/core';

import { AuthService,OrderService,NotificationService } from '../../../services/index';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  tab1:Boolean = true;
  tab2:Boolean = false;
  users:any;
  orders:any;

  constructor(private authService : AuthService,
    private orderService : OrderService,
    private notificationService : NotificationService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllOrders();
  }

  getAllUsers(){
    this.authService.getAllUsers().subscribe((data:any)=>{
      this.users = data?.data;
    })
  }

  getAllOrders(){
    this.orderService.getAllOrders().subscribe((data:any)=>{
      this.orders = data?.data;
      
    })
  }

  changeTab(tab:string){
    if(tab == "orders"){
      this.tab2 = true;
      this.tab1 = false;
    }else{
      this.tab2 = false;
      this.tab1 = true;
    }
  }
  deleteOrder(id:any){
    this.orderService.deleteOrder(id).subscribe((data:any)=>{
      this.notificationService.showSuccess(data?.message,"");
      this.getAllOrders();
    })
  }
}
