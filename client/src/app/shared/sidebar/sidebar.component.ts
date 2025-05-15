import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  isAdmin : Boolean = false;
  cartCount:any;
  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    let details : any = this.authService.currentUserValue;
    this.getCartCount(details._id);  
    if(details.userRole == "admin"){
      this.isAdmin = true;
    }
    this.authService.currentCart.subscribe((data:any)=>{
      this.getCartCount(details._id); 
      
    })
  }

  logout(){
    this.authService.logout();
  }
  navbarClass = "topnav";
  responsive(){
    if(this.navbarClass == "topnav"){
      this.navbarClass = "topnav responsive"
    }else{
      this.navbarClass = "topnav";
    }
  }

  getCartCount(id:any){
    this.authService.getCartCount(id).subscribe((data:any)=>{
      this.cartCount = data.count;
    })
  }
}
