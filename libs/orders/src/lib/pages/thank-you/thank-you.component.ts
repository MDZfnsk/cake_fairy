import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'orders-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit{

  currentOrder;
  currentOrderId;

  constructor(
    private ordersService: OrdersService, 
    private cartService: CartService, 
    private route: ActivatedRoute,
    private router: Router
    ) {}

    ngOnInit(): void {
      this._placeOrder();        
      
    }



    //Place order
    private _placeOrder(){
      this.route.queryParams.subscribe((params) => {
        if (params.session_id) {

            const orderData = this.ordersService.getCachedOrderData();
            console.log(orderData);
            
            this.currentOrder = orderData;

            this.ordersService.createOrder(orderData).subscribe((order) => {                  
              this.currentOrderId = order.id;
              console.log(orderData.product);
              
              
                this.cartService.removeCartItem(orderData.product.toString());
                this.ordersService.removeCachedOrderData();
            });
        }else{
          console.log("Bad request");
        }
    });
    }

    reviewStore(){
      this.router.navigateByUrl(`form/ratings/${this.currentOrderId}`);       
    }


}
