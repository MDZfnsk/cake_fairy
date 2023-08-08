import { Component } from '@angular/core';
import { AdminAuthService } from 'libs/admins/src/lib/admin-auth.service';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(
    private adminAuthService: AdminAuthService
    ) { }


  logoutUser(){
    this.adminAuthService.logout();
    console.log("click");
    
  }

}
