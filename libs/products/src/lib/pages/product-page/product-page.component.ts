import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { CartItem, CartService } from '@cakefairy/orders';
import { RatingsService } from '@cakefairy/stores';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  
  product: Product;
  endSubs$: Subject<any> = new Subject();
  quantity = 1;
  productRating;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private cartService: CartService,
    private messageService: MessageService,
    private router: Router,
    private ratingsService: RatingsService
  ){}

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        if(params.productid){
          this._getProduct(params.productid);
        }
      })
  }

  //Get product
  private _getProduct(id: string){
    this.productsService.getProduct(id).pipe(takeUntil(this.endSubs$)).subscribe(product => {
      this.product = product;
      this._getStoreRating(product.store.id);
    })

  }


  //Add product to cart
  addProductToCart(){

    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    }
    this.cartService.setCartItems(cartItem);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Added to Cart Successfully..' });

  }

   //Proceed to payment directly
   directToCheckout(productId){
    this.router.navigate(['checkout'],{queryParams:{ productId: productId, quantity: this.quantity}});
  }


  //Get store ratings
  private _getStoreRating(storeId){
      this.ratingsService.getRatingsByStore(storeId).pipe(takeUntil(this.endSubs$)).subscribe(ratings => {
        const arrayLength = ratings.length;
        let totalRating = 0;
        for(let i=0; i<arrayLength; i++){
          totalRating = totalRating + ratings[i].rating;
        }
        this.productRating = (totalRating/arrayLength);     
    })

  }

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  itemClicked(storeId){   
    this.router.navigateByUrl(`ratings/${storeId}`);    
  }

  ngOnDestroy(): void {
      this.endSubs$.next(2);
  }


}
