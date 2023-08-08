import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StoresService } from '../../services/stores.service';
import { Subject, takeUntil, timer } from 'rxjs';
import { Store } from '../../models/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService, User } from '@cakefairy/users';

@Component({
  selector: 'stores-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.scss']
})
export class StorePageComponent implements OnInit {

  

  user: User;
  curentStoreId = null;
  store: Store;
  endSubs$: Subject<any> = new Subject();

  constructor (
    private route: ActivatedRoute,
    private storesService: StoresService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private usersService: UsersService
  ) {}


  ngOnInit(): void {
    this._getStoreIdfromParams();
    this._getStoreDetails();
    this._getLoggedUserData();
    
      
  }


  //Get Store ID from URL parameters
  private _getStoreIdfromParams(){
    this.route.params.subscribe((params) => {      
      if (params.storeId) {        
        this.curentStoreId = params.storeId;
      }
    });
  }


  //Get Store Info
  private _getStoreDetails() {
    if(this.curentStoreId){
      this.storesService.getStore(this.curentStoreId).pipe(takeUntil(this.endSubs$)).subscribe(store => {
       this.store = store;
      })    
    }   

  }


  editStore(storeID){   
    this.router.navigate(['user/store/form'],{queryParams:{ storeId: storeID}});  
  }

  deleteStore(storeId){
    this.confirmationService.confirm({
      message: 'Do you want ot delete this Store ?',
      header: 'Delete Store',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.storesService
          .deleteStore(storeId)
          .pipe(takeUntil(this.endSubs$))
          .subscribe(
            (response) => {
              if (response) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Store Deleted Successfully..',
                });                
                timer(1500)
                  .toPromise()
                  .then(() => {
                    this.router.navigateByUrl(``);
                  });
              }
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'User NOT Deleted !!!',
              });
            }
          );
      },
    });
    
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


  ngOnDestroy(): void {
    this.endSubs$.next(2);
}

}
