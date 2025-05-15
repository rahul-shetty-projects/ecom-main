import { Component, OnInit } from '@angular/core';

import { AuthService,OrderService,NotificationService } from '../../../services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userDetails:any;
  myorders : any;
  cart:any;
  totalBill:number= 0;
  shipping = 30;
  taxes = 5;
  flag = false;
  constructor(private authService :  AuthService,
    private router : Router,
    private notificationService : NotificationService) { }

  ngOnInit(): void {
    this.userDetails = this.authService.currentUserValue;
    this.getMyCart(this.userDetails._id);
  }
  
  getMyCart(id:any){
    this.authService.getMyCart(id).subscribe((data:any)=>{
      this.cart = data?.products;
      this.flag = true;
      if(this.cart?.length <= 0 || this.cart == undefined){
        this.notificationService.showError("No Product in Your Cart","");
      }
      for(let i=0;i<this.cart?.length;i++){
        this.totalBill += this.cart[i].productPrice;
      }
    })
  }
  


  removeFromCart(id:any){
    this.authService.removeFromCart(this.userDetails._id,id).subscribe((data:any)=>{
      this.flag = false;
      this.getMyCart(this.userDetails._id);
      this.authService.changeCart(true);
    })
  }
  
  order(id:any){
    let temp = [];
    temp.push(id);
    this.router.navigate(['/dashboard/order/'],{
      queryParams: {
        prop: JSON.stringify(temp)
      }
    });
  }
  buyAll(){
    let temp = [];
    for(let i=0;i<this.cart.length;i++){
      temp.push(this.cart[i]._id);
    }
    this.router.navigate(['/dashboard/order/'],{
      queryParams: {
        prop: JSON.stringify(temp)
      }
    });
    
  }
}
