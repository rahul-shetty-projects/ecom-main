import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService, NotificationService } from '../../services/index';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  otp:any;
  passwordForm !: FormGroup;
  formSubmitted = false;

  constructor(private authService : AuthService,
    private route: ActivatedRoute,
    private notificationService : NotificationService,
    private router: Router) { }

  ngOnInit(): void {
    this.otp = this.route.snapshot.params.otp;
  }

  confirmAccount(){
    this.authService.confirmAccount(this.otp).subscribe((data:any)=>{
      this.notificationService.showSuccess("",data.message);
      this.router.navigate(['/auth/login']);
    })
  }

}
