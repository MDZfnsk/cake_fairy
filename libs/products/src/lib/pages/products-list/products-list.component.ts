import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'products-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products;
  pagedProducts: Product[];
  categories;
  isCategoryPage: boolean;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.categoryid) {
        this.isCategoryPage = true;
        this._getProducts([params.categoryid]);
      } else if (params.searchString) {
        this.isCategoryPage = true;
        this._getProductsByTextSeacrh(params.searchString);
      } else {
        this.isCategoryPage = false;
        this._getProducts();
      }
    });
    this._getCategories();
  }

  //Get all products
  private _getProducts(categoriesFilter?: string[]) {
    this.productsService
      .getProducts(categoriesFilter)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((allProducts) => {
        // console.log(allProducts);
        this.products = allProducts.filter((product) => product?.store.owner.isActive);
        this.pagedProducts = this.products.slice(0, 12);
      });
      ;
  }

  //Get all Categories
  private _getCategories() {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  categoryFilter() {
    const selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => category.id);
    this._getProducts(selectedCategories);
  }

  //Get products by Text Seacrh
  private _getProductsByTextSeacrh(searchString: string) {
    this.productsService.getFromTextSearch(searchString).pipe(takeUntil(this.endSubs$)).subscribe((products) => {
        if (products) { 
          this.products = products.filter((product) => product?.store.owner.isActive);
          this.pagedProducts = this.products.slice(0, 12);
        }
      });
  }

  onPageChange(event): void {
    // console.log(event);    
    const startIndex = event.first;
    const endIndex = event.first + event.rows;
    this.pagedProducts = this.products.slice(startIndex, endIndex);
  }

  ngOnDestroy(): void {
    this.endSubs$.next(2);
  }
}
