import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Product, ProductsService } from '@cakefairy/products';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'libs/products/src/lib/services/products.service';

@Component({
  selector: 'admin-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {



  
  products;  
  endSubs$: Subject<any> = new Subject();

  
  constructor(
    private productsService: ProductsService,
    private router: Router,
    // private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._getProducts();    

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

  viewProduct(productId){
    this.router.navigateByUrl(`products-info/${productId}`);
  }

 

  ngOnDestroy(): void {
    this.endSubs$.next(2);
  }

}
