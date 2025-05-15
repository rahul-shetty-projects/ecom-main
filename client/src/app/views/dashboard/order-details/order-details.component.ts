import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrderService } from '../../../services/index';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderDetails : any;
  show:Boolean= false;
  constructor(private activateRoute : ActivatedRoute,
    private orderService : OrderService) { }

  ngOnInit(): void {
    this.getOrderDetails(this.activateRoute.snapshot.paramMap.get('id'));
  }

  getOrderDetails(id:any){
    this.orderService.getOrderDetail(id).subscribe((data:any)=>{
      this.orderDetails = data?.data; 
    },err=>{
      this.show = true;
    })
  }
}
