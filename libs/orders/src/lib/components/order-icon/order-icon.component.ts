import { Component, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'orders-order-icon',
  templateUrl: './order-icon.component.html',
  styleUrls: ['./order-icon.component.scss'],
})
export class OrderIconComponent implements OnChanges, OnDestroy {
  orderCount;
  pendingOrders;
  endSubs$: Subject<any> = new Subject();

  @Input() storeId;

  constructor(
    private ordersService: OrdersService
  ) {}

  ngOnChanges(): void {    
    if(this.storeId){
     this._getPendingOrdersCount();
    }      
  }

 


  private _getPendingOrdersCount(){
    this.ordersService.getPendingOrdersByStore(this.storeId).pipe(takeUntil(this.endSubs$)).subscribe(reslut => { 
      if(reslut){
        this.orderCount = reslut['count'];
      }    
      
    },(error)=>{
      console.log(error);
      
    })
  }

  ngOnDestroy(): void {
    this.endSubs$.next(2);
  }
}
