import { Component,OnInit,OnDestroy } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {

  
  endSubs$: Subject<any> = new Subject();
  totalPrice: number;
  isCheckout = false;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private router: Router
  ) {
    this.router.url.includes('checkout') ? this.isCheckout = true : this.isCheckout = false;
  }


  ngOnInit(): void {
      this._getOrderSummary();
  }


  //Getting Order Summary
  private _getOrderSummary(){
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cartItems)=> {
      this.totalPrice = 0;      
      if(cartItems){
       cartItems.items.map(item => {
        this.ordersService.getProduct(item.productId).pipe(take(1)).subscribe(product => {
          this.totalPrice += product.price * item.quantity ;
        })
       })
      }

    })
  }
  

  ngOnDestroy(): void {
      this.endSubs$.next(2);
  }




}
