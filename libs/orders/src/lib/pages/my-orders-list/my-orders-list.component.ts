import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { ORDER_STATUS } from '@cakefairy/orders';
import { User, UsersService } from '@cakefairy/users';

@Component({
  selector: 'orders-my-orders-list',
  templateUrl: './my-orders-list.component.html',
  styleUrls: ['./my-orders-list.component.scss'],
})
export class MyOrdersListComponent implements OnInit, OnDestroy {
  
  currentUserId;
  user: User ;
  orderStatus =  ORDER_STATUS;
  orders = [];
  endSubs$: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this._getUserIdfromUrl();
    this._getOrdersList();
    this._getLoggedUserData();
    
  }

  //Get user Id from URL
  private _getUserIdfromUrl() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.currentUserId = params.id;
      }
    });
  }


  //Get loged in User from the Session Storage
  private _getLoggedUserData() {
    this.usersService
      .observeCurrentUSer()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((user) => {
        this.user = user;
      });
  }

  //Get all orders by the Current User
  private _getOrdersList() {
    this.ordersService
      .getOrdersByUser(this.currentUserId)
      .subscribe((orders) => {
        this.orders = orders;
      },(error) => {
        console.log(error);        
      });
  }

  //View Order Details
  viewOrder(orderId){    
    this.router.navigateByUrl(`user/myorders/details/${orderId}`);    

  }

  ngOnDestroy(): void {
    this.endSubs$.next(2);
  }
}
