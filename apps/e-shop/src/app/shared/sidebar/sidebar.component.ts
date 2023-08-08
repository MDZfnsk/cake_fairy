import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoresService } from 'libs/stores/src/lib/services/stores.service';
import { Store } from 'libs/stores/src/lib/models/store';
import { User } from 'libs/users/src/lib/models/user';
import { UsersService } from 'libs/users/src/lib/services/users.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'libs/users/src/lib/services/auth.service';

@Component({
  selector: 'eshop-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  
  endSubs$: Subject<any> = new Subject();
  user: User = null;
  userStoreId;
  isShopOwner = null;

  constructor(
    private usersService: UsersService,
    private storesService: StoresService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this._getLoggedUserData();
  }

  private _getLoggedUserData() {
    this.usersService
      .observeCurrentUSer()
      .subscribe((user) => {       
        this.user = user;
        if (user) {
          if (user.isSeller) {
            this.isShopOwner = true;
            this.storesService.getUserStore(this.user.id).subscribe((store) => {             
              this.userStoreId = store[0].id;
            });
          }
        }
      });
  }

  logoutUser(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(2);
  }
}
