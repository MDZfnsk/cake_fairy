import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router} from '@angular/router';
import { ProductsService } from 'libs/products/src/lib/services/products.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService, User } from '@cakefairy/users';

@Component({
  selector: 'eshop-store-products-list',
  templateUrl: './store-products-list.component.html',
  styleUrls: ['./store-products-list.component.scss']
})
export class StoreProductsListComponent {
  
  products = [];
  user: User;
  currentStoreId;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private productsService: ProductsService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService   
    
  ) {}

  ngOnInit(): void {
    this._initCurrentStoreId();   
    this._getProductsbyStore(this.currentStoreId);
    this._getLoggedUserData();      
  }

     //Get loged in User from the Session Storage
     private _getLoggedUserData() {
      this.usersService
        .observeCurrentUSer()
        .pipe(takeUntil(this.endSubs$))
        .subscribe((user) => {
          this.user = user;
        });
    }

  //Getting current Store Id from the URL
  private _initCurrentStoreId(){
    this.route.params.subscribe((params) => {      
      if (params.storeId) {        
        this.currentStoreId = params.storeId;        
      }
    });

  }

  //Get products belongs to the Current Store
  private _getProductsbyStore(storeId: string){
    this.productsService.getProductsByStoreId(storeId).pipe(takeUntil(this.endSubs$)).subscribe(prodcuts => {
      this.products = prodcuts;      
    })
  }

  //Edit product
  editProduct(productId){
    this.router.navigate(['user/store/products/form'],{queryParams:{ productId: productId}});
  }


  //Delete Product
  deleteProduct(productId){
    this.confirmationService.confirm({
      message: 'Do you want ot delete this Product ?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.productsService.deleteProduct(productId).pipe(takeUntil(this.endSubs$)).subscribe(
              (response) => {
                  if (response) {                      
                      this._getProductsbyStore(this.currentStoreId);
                      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Deleted Successfully..' });
                  }
              },
              () => {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product NOT Deleted !!!' });
              }
          );
      },            
  });
    
  }

   



  ngOnDestroy(): void {
    this.endSubs$.next(2);
  }


}
