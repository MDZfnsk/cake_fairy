import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { CartItemDetailed } from '../../models/cart';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, OnDestroy {

  

  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService, //Circular Dependancy Fix
    private confirmationService: ConfirmationService,
    private messageService: MessageService
    
  ) {}



  ngOnInit(): void {
      this._getCartItems();
  }


  //Navigate back to home page
  backToShop() {
    this.router.navigate(['/']);
  }


  //Getting Cart Items
  private _getCartItems(){
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(cartItems => {
      this.cartItemsDetailed = [];
      this.cartCount = cartItems?.items?.length ?? 0;     
      cartItems?.items?.forEach(item => {
        this.ordersService.getProduct(item.productId).subscribe((resProduct) => {         
          this.cartItemsDetailed.push({
            product: resProduct,
            quantity: item.quantity
          })
        })
          
      });
    })
  }



  //Remove item from cart
  deleteCartItem(cartItem: CartItemDetailed) {
    
    
    this.confirmationService.confirm({
      message: 'Do you want ot remove this Product ?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cartService.removeCartItem(cartItem.product.id);
        this.messageService.add({ severity: 'error', summary: 'Removed', detail: 'Item removed from Cart !!!' });         
      },            
  });
  }


  ngOnDestroy(): void {
      this.endSubs$.next(2);
  }


  updateCartItemQuantity(event, cartItem: CartItemDetailed){
    this.cartService.setCartItems({
      productId: cartItem.product.id,
      quantity: event.value
    },true)

  }

  //Navigate to Checkout
  directToCheckout(productId,quantity){   
    this.router.navigate(['checkout'],{queryParams:{ productId: productId, quantity: quantity}});
  }



  

}
