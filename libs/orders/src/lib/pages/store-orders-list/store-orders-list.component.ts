import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { ORDER_STATUS } from '@cakefairy/orders';
import { User, UsersService } from '@cakefairy/users';


@Component({
  selector: 'orders-store-orders-list',
  templateUrl: './store-orders-list.component.html',
  styleUrls: ['./store-orders-list.component.scss']
})
export class StoreOrdersListComponent {  

  user: User; 
  orderStatus =  ORDER_STATUS;
  currentStoreId;
  orders = [];
  orderCount;
  totalSales;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private ordersService: OrdersService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this._getstoreIdfromUrl();
    this._getOrdersList();
    this._getTotalSales();
    this._getLoggedUserData(); 
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

  //Get user Id from URL
  private _getstoreIdfromUrl() {
    this.route.params.subscribe((params) => {
      if (params.storeId) {
        this. currentStoreId = params.storeId;
      }
    });
  }

  //Get all orders by the Current Store
  private _getOrdersList() {
    this.ordersService.getOrdersByStore(this.currentStoreId).pipe(takeUntil(this.endSubs$)).subscribe(orders => {      
      this.orders = orders;
      this.orderCount = orders.length;
    },(error) => {
      console.log(error);        
    });      
  }


  //Get total sales for the store
  private _getTotalSales(){
    this.ordersService.getTotalSalesforStore(this.currentStoreId).pipe(takeUntil(this.endSubs$)).subscribe(result => {
      this.totalSales = result['totalsales'];     
    },(error) => {
      console.log(error);        
    })
  }

  //View Order Details
  viewOrder(orderId){    
    this.router.navigateByUrl(`user/store/order/details/${orderId}`);

  }

  ngOnDestroy(): void {
    this.endSubs$.next(2);
  }

}
