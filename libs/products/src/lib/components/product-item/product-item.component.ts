import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CartService, CartItem } from '@cakefairy/orders';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UsersService } from '@cakefairy/users';
import { timer } from 'rxjs';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product: Product;

  constructor(
    private cartService: CartService,
    private messageService: MessageService,
    private router: Router,
    private usersService: UsersService
  ) {}

  //Add product to Cart
  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1,
    };
    
    this.cartService.setCartItems(cartItem);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Product Added to Cart Successfully..',
    });
  }

  //Proceed to payment directly
  directToCheckout(productId) {
    this.router.navigate(['checkout'], {
      queryParams: { productId: productId, quantity: 1 },
    });
  }
}
