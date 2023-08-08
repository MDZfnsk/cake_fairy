import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ORDER_STATUS } from '../../orders.status-constants';
import { OrdersService } from '../../services/orders.service';
import { Location } from '@angular/common';

@Component({
  selector: 'orders-my-orders-details',
  templateUrl: './my-orders-details.component.html',
  styleUrls: ['./my-orders-details.component.scss']
})
export class MyOrdersDetailsComponent implements OnInit, OnDestroy {

  

  order;
  orderStatus = ORDER_STATUS;
  selectedStatus: any ;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // this._mapOrderStatus();
    this._getOrder();
      
  }

  //Get details about one specific Order
  private _getOrder() {
    this.route.params.subscribe((params) => {
      console.log(params);
      if(params.orderId){
        this.ordersService.getOrder(params.orderId).pipe(takeUntil(this.endSubs$)).subscribe((order)=> {
          this.order = order;          
        })
      }
    })

  }

  //Go Back
  onCancleClick(){
    this.location.back();
  }


  // //Mapping through library and creating Ordere Status array
  // private _mapOrderStatus() {
  //   this.orderStatuses = Object.keys(ORDER_STATUS).map(key => {
  //     // console.log(ORDER_STATUS[key])
  //     return {
  //       id: key,
  //       name: ORDER_STATUS[key].label
  //     };
  //   });
    
  // }

  // //Changing the Order status in the Database in relavance to the Dropdown
  // onStatusChange(event) {
  //   this.ordersService.updateOrder({status: event.value}, this.order.id).pipe(takeUntil(this.endSubs$)).subscribe(() => {
  //     this.messageService.add({ severity: 'success', summary: 'Success', detail: `Order Status Updated Successfully..` });
      
  //   },()=> {
  //     this.messageService.add({ severity: 'error', summary: 'Error', detail: `Order Status is NOT Updated !!!!` });
  //   })    
  // }

  ngOnDestroy(): void {
    this.endSubs$.next(2);
  }


}
