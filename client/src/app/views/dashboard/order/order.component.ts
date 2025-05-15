import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import swal from 'sweetalert2'; 
import { NgxSpinnerService } from "ngx-spinner";
import { ProductsService, OrderService, NotificationService, AuthService } from '../../../services/index';

import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  product:any;
  data:any;
  userDetails:any;
  orders:any;
  listOfProducts : any;
  date:any;

  name:any;
  email:any;
  country:any="";
  coupon:any;

  countries : any = [];

  constructor(private activateRoute : ActivatedRoute,
    private productService : ProductsService,
    private orderService : OrderService,
    private notificationService : NotificationService,
    private authService : AuthService,
    private spinner: NgxSpinnerService,
    private router : Router) { }

  ngOnInit(): void {
    this.showCouponError = false;
    this.showCouponApplied = false;
    this.date = new Date();
    this.userDetails = this.authService.currentUserValue;
    this.name = this.userDetails.userName;
    this.email = this.userDetails.userEmail;
    this.activateRoute.queryParams.subscribe(params => {
      this.listOfProducts = JSON.parse(params.prop);
    })
    this.orders = {
      orders: []
    }
    this.getAllProducts(this.listOfProducts);
    this.getAllCountries();
  }

  getAllCountries(){
    // this.orderService.getAllCountry().subscribe((data:any)=>{
    //   for(let i=0;i<data.length;i++){
    //     this.countries.push(data[i].name?.common);
    //   }
    // })
    this.countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe", "Palestine"]
  }

  getAllProducts(list: []){
    for(let i=0;i<list.length;i++){
    this.getProductDetails(list[i]);
    }
  }

  confirmOrder(){
    if(this.email == "" || this.country == undefined || this.country == ""){
      this.notificationService.showError("","Please Enter Full Shipping Information");
      return
    }
    let finalOrders = [];
    for(let i=0;i<this.orders?.orders.length;i++){
      finalOrders.push({
        country:this.country,
        productOrderedId:this.orders.orders[i].productOrderedId
      })
    }
    let or = {
      orders : finalOrders
    }
    this.orderService.placeOrder(or).subscribe((data:any)=>{
      this.notificationService.showSuccess("",data?.message);
      this.authService.changeCart(true);
      this.router.navigate(['/dashboard/thanks/'],{
        queryParams: {
          prop: JSON.stringify(data.orders)
        }
      });
    })
  }

  getProductDetails(id:any){
    this.productService.getProductDetails(id).subscribe((data:any)=>{
      this.product =  data?.data;
      let dataa = {
          "orderById" : this.userDetails._id,
          "orderBy":this.userDetails.userEmail,
          "orderDate":new Date(),
          "orderPrice":this.product?.productPrice ,
          "productOrderedId":this.product?._id,
          "productName":this.product?.productName,
          "productDescription":this.product?.productDescription,
          "productImage":this.product?.productImage
      }

      this.orders.orders.push(dataa)
    })
  }

  showCouponError : Boolean = false;
  showCouponApplied : Boolean = false;
  applyCoupon(){
    this.showCouponError = false;
    this.showCouponApplied = false;
    this.spinner.show();
    if(this.coupon == undefined || this.coupon == ""){
      this.notificationService.showError("","Please Enter Coupon");
      this.spinner.hide();
      return;
    }
    setTimeout(() => {
      if(this.coupon == "rahulshettyacademy"){
        this.spinner.hide();
        this.showCouponApplied = true;
        // this.notificationService.showSuccess("","Coupon Applied"); 
      }else{
        this.spinner.hide();
        this.showCouponError = true;
        // this.notificationService.showError("","Invalid Coupon");
      }
  }, 3000);
    
  }

  selectedStatic(result:any) {
    this.country = result;
  }

}
