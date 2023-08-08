import { CartService } from '@cakefairy/orders';
import { MenuItem } from 'primeng/api';
import { Component, OnInit} from '@angular/core';
import { StoresService } from 'libs/stores/src/lib/services/stores.service';
import { Store } from 'libs/stores/src/lib/models/store';
import { User } from 'libs/users/src/lib/models/user';
import { UsersService } from 'libs/users/src/lib/services/users.service';
import { Subject, interval, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'libs/users/src/lib/services/auth.service';

@Component({
  selector: 'eshop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  searchInputValue;

  endSubs$: Subject<any> = new Subject();
  user: User = null;
  isShopOwner = null;

  constructor(
    private cartService: CartService,
    private usersService: UsersService,
    private storesService: StoresService,
    private router: Router,
    private authService: AuthService
  ) {
    cartService.initCartLocalStorage();
  }

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/'],
      },
      {
        label: 'Products',
        icon: 'pi pi-fw pi-box',
        routerLink: ['/products'],
      },
      {
        label: 'About Us',
        icon: 'pi pi-fw pi-info-circle',
      },
    ];
    this._getLoggedUserData(); 

       
  }

 

  private _getLoggedUserData() {
    this.usersService
      .observeCurrentUSer()
      .subscribe((user) => {        
        if (user) {
            this.user = user;          
        }
      });
  }


  onSearchClicked(){
    this.router.navigateByUrl(`products/text/${this.searchInputValue}`);   
  }

  
}
