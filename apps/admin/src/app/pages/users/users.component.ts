import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Product, ProductsService } from '@cakefairy/products';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@cakefairy/users';

const USER_STATUS = {
  'true': {
    label: 'Active',
    color: 'success'
  },
  'false': {
    label: 'Blocked',
    color: 'danger'
  }
}


const USER_ROLES = {
  'true': {
    label: 'Seller',
    color: 'warning'
  },
  'false': {
    label: 'Buyer',
    color: 'primary'
  }

}



@Component({
  selector: 'admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {  

  userStatus = USER_STATUS;
  userRoles = USER_ROLES;
  users;
  endSubs$: Subject<any> = new Subject();

  
  constructor(
    private usersService: UsersService,
    private router: Router    
    
  ) {}

  ngOnInit(): void {
    this._getUsers();    

  }

  //Get all Stores
  private _getUsers() {
    this.usersService.getUsers().pipe(takeUntil(this.endSubs$)).subscribe((users)=> {
      this.users = users;

    })   
  }

  viewUser(userId){
    this.router.navigateByUrl(`users-info/${userId}`);    

  }

 

  ngOnDestroy(): void {
    this.endSubs$.next(2);
  }


}
