import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Subject, takeUntil, timer } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService, User } from '@cakefairy/users';
import { StoresService, Store } from '@cakefairy/stores';

@Component({
  selector: 'admin-stores-info',
  templateUrl: './stores-info.component.html',
  styleUrls: ['./stores-info.component.scss']
})
export class StoresInfoComponent implements OnInit, OnDestroy {
  

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
        if(store){
       this.store = store;
       console.log(store.owner.id);
       
       this._getStoreOwnerData(store.owner.id);
        }

      })    
    }   

  }

  //Get store owner data
  private _getStoreOwnerData(ownerId){
    this.usersService.getUser(ownerId).pipe(takeUntil(this.endSubs$)).subscribe(user => {     
      this.user = user;
    })
  }


 


  ngOnDestroy(): void {
    this.endSubs$.next(2);
}


}
