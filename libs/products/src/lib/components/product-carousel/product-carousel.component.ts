import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { Subject, takeUntil } from 'rxjs';
import { CartService, CartItem } from '@cakefairy/orders';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'products-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent implements OnInit,OnDestroy {

  products: Product[] = [];  
  endSubs$: Subject<any> = new Subject();
  responsiveOptions;
  

  
  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private messageService: MessageService,
    private router: Router    
  ) {

    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ]
  }

  

  


  ngOnInit(): void {
    this._getProducts();   
  }


    //Add product to Cart
    addProductToCart(productId){
      console.log("clicked")
      const cartItem: CartItem = {
        productId: productId,
        quantity: 1
      }
      this.cartService.setCartItems(cartItem);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Added to Cart Successfully..' });
    }

    //Proceed to payment directly
  directToCheckout(productId){
    this.router.navigate(['checkout'],{queryParams:{ productId: productId, quantity: 1}});
  }






  //Get all products
  private _getProducts() {
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((products) => {
        this.products = products;
      });
  }
  
 

  ngOnDestroy(): void {
    this.endSubs$.next(2);
  }

}
