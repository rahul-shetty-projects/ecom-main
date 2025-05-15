import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService, AuthService, NotificationService } from '../../../services/index';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product:any;
  constructor(private activateRoute : ActivatedRoute,
    private productService : ProductsService,
    private authService : AuthService,
    private notificationService : NotificationService) { }

  ngOnInit(): void {
    this.getProductDetails(this.activateRoute.snapshot.paramMap.get('id'))
  }

  getProductDetails(id:any){
    this.productService.getProductDetails(id).subscribe((data:any)=>{
      this.product =  data?.data;
    })
  }

  addToCart(product:any){
    let user:any = this.authService.currentUserValue;
    let data = {
      _id:user._id,
      product : product
    }
    this.authService.addToCart(data).subscribe((data:any)=>{
     this.notificationService.showSuccess(data?.message,''); 
     this.authService.changeCart(true);
    })
  }

}
