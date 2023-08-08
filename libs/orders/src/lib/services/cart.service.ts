import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';
import { BehaviorSubject } from 'rxjs';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
  constructor() {}

  //Initializing an empty Cart in Browser's Localstorage
  initCartLocalStorage() {
      const cart: Cart = this.getCart();
      if (!cart) {
          const initCart = {
              items: []
          };

          const initCartJson = JSON.stringify(initCart);
          localStorage.setItem(CART_KEY, initCartJson);
      }
  }



  //Get Cart and return Cart as a JSON Object
  getCart(): Cart {
      const cartJsonString: string = localStorage.getItem(CART_KEY);
      const cart: Cart = JSON.parse(cartJsonString);
      return cart;
  }

  //Add items to the Cart
  setCartItems(cartItem: CartItem, updateCartItem?:boolean): Cart {
      const cart = this.getCart();

      const cartItemExist = cart.items.find((item) => item.productId === cartItem.productId);

      if (cartItemExist) {
          cart.items.map((item) => {
              if (item.productId === cartItem.productId) {
                  if(updateCartItem){
                      item.quantity = cartItem.quantity;
                  }else {
                      item.quantity = item.quantity + cartItem.quantity;
                  }
                  
                  return item;
              }
          });
      } else {
          cart.items.push(cartItem);
      }

      const cartJson = JSON.stringify(cart);
      localStorage.setItem(CART_KEY, cartJson);
      this.cart$.next(cart);
      return cart;
  }


  //remove cart item
  removeCartItem(productId: string){
    console.log("awooooo");
    
      const cart = this.getCart();
      const newCart = cart.items.filter(item => item.productId !== productId);

      cart.items = newCart;

      const cartJson = JSON.stringify(cart);
      localStorage.setItem(CART_KEY, cartJson);
      this.cart$.next(cart);
  }


  //Empty cart after Checkout
  emptyCart(){
      const initCart = {
          items: []
      };

      const initCartJson = JSON.stringify(initCart);
      localStorage.setItem(CART_KEY, initCartJson);
      this.cart$.next(initCart);

  }



  
}
