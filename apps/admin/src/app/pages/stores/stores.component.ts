import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Product, ProductsService } from '@cakefairy/products';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'libs/products/src/lib/services/products.service';
import { StoresService } from '@cakefairy/stores';
import { OrdersService } from 'libs/orders/src/lib/services/orders.service';

@Component({
  selector: 'admin-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent {
  

  stores;
  endSubs$: Subject<any> = new Subject();
  orderCounts: { [storeId: string]: number } = {};

  
  constructor(
    private storesService: StoresService,    
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this._getStores();    

  }

  //Get all Stores
  private _getStores() {
    this.storesService.getAllStores().pipe(takeUntil(this.endSubs$)).subscribe((stores) => {
      this.stores = stores;      
      this.fetchOrderCounts(stores); // Fetch order counts for all stores
        

    });    
  }

 
  //Fetch order count
  private fetchOrderCounts(stores) {
    for (const store of stores) {
      this.ordersService.getOrderCountbyStore(store.id).pipe(
        takeUntil(this.endSubs$)
      ).subscribe(result => {
        if (result) {
          const count = result['count'];
          this.orderCounts[store.id] = count;
        }
      });
    }   
    
  }
  


  //Get orders cout from the orderCounts array
  getOrderCount(storeId){    
    return this.orderCounts[storeId] || 0;   
  }


  //View store info
  viewStore(storeId){
    this.router.navigateByUrl(`stores-info/${storeId}`);
  }



 

  ngOnDestroy(): void {
    this.endSubs$.next(2);
  }

}
