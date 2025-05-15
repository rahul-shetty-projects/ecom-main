import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { OrderService } from '../../../services/index';

@Component({
  selector: 'app-thanksorder',
  templateUrl: './thanksorder.component.html',
  styleUrls: ['./thanksorder.component.scss']
})
export class ThanksorderComponent implements OnInit {
  orderDetailss:any=[];
  or:any;
  allOrders:any;
  constructor(private activateRoute : ActivatedRoute,
    private orderService : OrderService) { }

  ngOnInit(): void {
    this.allOrders = [];
    this.showOrderDetails = false;
    this.activateRoute.queryParams.subscribe(params => {
      this.orderDetailss = JSON.parse(params.prop);
    },err=>{
      this.showOrderDetails = false
    })
    
    this.getAllProducts(this.orderDetailss);
  }

  showOrderDetails = false;
  getAllProducts(orders: []){
  for(let i=0;i<orders.length;i++){
    this.getOrderDetails(orders[i]);
    if(i == (orders.length - 1)){
      this.showOrderDetails = true;
    }
  }
      
  }
  getOrderDetails(id:any){
    this.orderService.getOrderDetail(id).subscribe((data:any)=>{
      this.or = data?.data;
      this.allOrders.push(this.or);
    })
  }

  openCSV(){
    let orders = [];
    let fileName = "";
    for(let i=0;i<this.allOrders.length;i++){
      fileName = this.allOrders[i].orderBy.substring(0,this.allOrders[i].orderBy.indexOf('@'));
      let obj = {
        "Invoice Number":this.allOrders[i]._id,
        "Product Name":this.allOrders[i].productName,
        "Product Description":this.allOrders[i].productDescription,
        "Product Price":this.allOrders[i].orderPrice,
        "Address":this.allOrders[i].country,
        "Ordered By":this.allOrders[i].orderBy
      }
      orders.push(obj);
      if((this.allOrders.length - 1) == i){
        this.orderService.downloadFile(orders,'order-invoice_'+fileName);
      }
    }
  } 

}
