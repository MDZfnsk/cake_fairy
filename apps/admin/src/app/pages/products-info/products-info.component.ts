import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Subject, takeUntil, timer } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService, User } from '@cakefairy/users';
import { StoresService, Store } from '@cakefairy/stores';
import { ProductsService } from '@cakefairy/products';

@Component({
  selector: 'admin-products-info',
  templateUrl: './products-info.component.html',
  styleUrls: ['./products-info.component.scss']
})
export class ProductsInfoComponent implements OnInit,OnDestroy {
  

  user: User;
  curentProductId = null;
  productImages;
  product;
  store: Store;
  endSubs$: Subject<any> = new Subject();

  constructor (
    private route: ActivatedRoute,
    private storesService: StoresService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private usersService: UsersService,
    private productsService: ProductsService
  ) {}


  ngOnInit(): void {
    this._getProducIdfromParams();
    this._getProductsInfo();
    // this._getStoreDetails();
      
  }


  //Get Store ID from URL parameters
  private _getProducIdfromParams(){
    this.route.params.subscribe((params) => {      
      if (params.productId) { 
        this.curentProductId = params.productId;       
      }
    });
  }

  
  //Get Products Info
  private _getProductsInfo(){
    this.productsService.getProduct(this.curentProductId).pipe(takeUntil(this.endSubs$)).subscribe(product => {     
      this.product = product; 
      this.productImages = product.images;
      console.log(product);
      

             
    })
  }



  // //Get Store Info
  // private _getStoreDetails() {
  //   if(this.curentStoreId){
  //     this.storesService.getStore(this.curentStoreId).pipe(takeUntil(this.endSubs$)).subscribe(store => {
  //       if(store){
  //      this.store = store;
  //      console.log(store.owner.id);
       
  //      this._getStoreOwnerData(store.owner.id);
  //       }

  //     })    
  //   }   

  // }

  


  ngOnDestroy(): void {
    this.endSubs$.next(2);
}


}
