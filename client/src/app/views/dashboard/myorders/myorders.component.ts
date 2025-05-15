import { Component, OnInit } from '@angular/core';

import { OrderService , AuthService, NotificationService } from '../../../services/index';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {
  myorders:any;
  userDetails:any;
  showIt:Boolean= false;
  constructor(private orderService : OrderService,
    private authService : AuthService,
    private notificationService : NotificationService) { }

  ngOnInit(): void {
    this.userDetails = this.authService.currentUserValue;
    this.getMyOrders(this.userDetails._id);
  }

  getMyOrders(id:any){
    this.orderService.getMyOrders(id).subscribe((data:any)=>{
      this.myorders = data?.data;
      this.showIt = true;
    })
  }

  delete(id:any){
    this.orderService.deleteOrder(id).subscribe((data:any)=>{
      this.notificationService.showSuccess(data?.message,"");
      this.getMyOrders(this.userDetails._id);
    })
  }

}
