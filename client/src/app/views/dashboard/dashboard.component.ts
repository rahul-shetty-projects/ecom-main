import { Component, OnInit, Sanitizer } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { NgxSpinnerService } from "ngx-spinner";

import { ProductsService, NotificationService,AuthService } from '../../services/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  searchForm !: FormGroup;
  sidebarExpanded = true;
  data : any = {};
  products :any;

  p: number = 0;
  itemsPerPage = 9;
  totalItems : any;

  

  categories = ["fashion","electronics","household"];
  subCategories = ["t-shirts","shirts","shoes","mobiles","laptops"];
  genders = ["men","women"];
  constructor(private productService : ProductsService,
    private sanitizer: DomSanitizer,
    private authService : AuthService,
    private formBuilder : FormBuilder,
    private notificationService : NotificationService,
    private router : Router,
    private spinner: NgxSpinnerService) { }

    details : any;

  ngOnInit(): void {
    this.details = this.authService.currentUserValue
    this.createForm();
    this.getAllProducts();
  }

  createForm(){
    this.searchForm = this.formBuilder.group({
      productName : [''],
      minPrice : [],
      maxPrice : [],
      productCategory : [[]],
      productSubCategory : [[]],
      productFor : [[]],
      // sortBy : [''] 
    })
  }
  changeText(){
    this.getAllProducts();
  }

  getAllProducts(){
    this.searchForm.value.minPrice = parseInt(this.searchForm.value.minPrice);
    this.searchForm.value.maxPrice = parseInt(this.searchForm.value.maxPrice);

    this.productService.getProducts(this.searchForm.value).subscribe((data : any)=>{
      if(data?.data.length == 0){
        this.notificationService.showError("",data?.message);
        this.data = [];
      }
      this.products = data?.data;
      this.totalItems = this.products.length;
      for(let i=0;i<3;i++){
        this.authService.getCartCount(this.details._id).subscribe((data:any)=>{
          console.log(i);
        })
      }
    })
  }

  getPage(page:any){

  }

  cat:any = [];
  sub:any = [];
  ge:any = [];
  selectCategories(event:any,val:any){
    if(event.target.checked){
      this.cat.push(val);
    }else{
      const itemIndex = this.cat.indexOf(val);
      if(itemIndex != -1) this.cat.splice(itemIndex,1);
    }
    this.searchForm.patchValue({productCategory:this.cat});
    this.getAllProducts();
  }

  selectSubCategories(event:any,val:any){
    if(event.target.checked){
      this.sub.push(val);
    }else{
      const itemIndex = this.sub.indexOf(val);
      if(itemIndex != -1) this.sub.splice(itemIndex,1);
    }
    this.searchForm.patchValue({productSubCategory:this.sub});
    this.getAllProducts();
  }

  selectGender(event:any,val:any){
    if(event.target.checked){
      this.ge.push(val);
    }else{
      const itemIndex = this.ge.indexOf(val);
      if(itemIndex != -1) this.ge.splice(itemIndex,1);
    }
    this.searchForm.patchValue({productFor:this.ge});
    this.getAllProducts();
  }

  order(id:any){
    this.router.navigate(['/dashboard/order/'+id]);
  }
  addToCart(product:any){
    this.spinner.show();
    let user:any = this.authService.currentUserValue;
    let data = {
      _id:user._id,
      product : product
    }
    this.authService.addToCart(data).subscribe((data:any)=>{
      setTimeout(() => {
     this.notificationService.showSuccess(data?.message,'');
     this.spinner.hide();
    }, 1000); 
     this.authService.changeCart(true);
    })
  }
}
