import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '@cakefairy/products';
import { StoresService } from '@cakefairy/stores';
import { UsersService } from '@cakefairy/users';
import { OrdersService } from 'libs/orders/src/lib/services/orders.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  totalSales;
  userCount;
  productsCount;
  storesCount;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private ordersService: OrdersService,
    private usersService: UsersService,
    private productsService: ProductsService,
    private storesService: StoresService
  ){}

  ngOnInit(): void {
      this._getTotalIncome();
      this._getUserCount();
      this._getProductsCount();
      this._getStoresCount();
  }



  //Get total income for the app
  private _getTotalIncome(){
    this.ordersService.getTotalSales().pipe(takeUntil(this.endSubs$)).subscribe(sales => {
      this.totalSales = sales['totalsales'];
    
    })
  }


  //Get total number of users
  private _getUserCount(){
    this.usersService.getUserCount().pipe(takeUntil(this.endSubs$)).subscribe(users => {
      this.userCount = users['count'];      
    })
  }


  //Get all the Products Count
  private _getProductsCount(){
    this.productsService.getProductCount().pipe(takeUntil(this.endSubs$)).subscribe(prodCOunt => {
      this.productsCount = prodCOunt['count'];     

    })
  }


  //Get total number of stores
  private _getStoresCount(){
    this.storesService.getStoreCount().pipe(takeUntil(this.endSubs$)).subscribe(storeCount => {
      this.storesCount = storeCount['count'];
    })


  }




  ngOnDestroy(): void {
    this.endSubs$.next(2);
  }

}


