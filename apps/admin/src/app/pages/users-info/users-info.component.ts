import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil, timer } from 'rxjs';


import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

import { UsersService, User } from '@cakefairy/users';
import { Store, StoresService } from '@cakefairy/stores';

@Component({
  selector: 'admin-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.scss']
})
export class UsersInfoComponent {

  accountStatuses = [{id: true, name: "Active"}, {id: false, name: "Deactive"}]

  curretUser; 
  selectedStatus; 
  endSubs$: Subject<any> = new Subject();
  user: User;
  store: Store;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private storesService: StoresService   
    
  ) {}

  ngOnInit(): void {
    this._getUserIdfromUrl();
    this._getUserData();           
    
  }


  //Getting user ID from URL
  private _getUserIdfromUrl(){
    this.route.params.subscribe(params=> {
      this.curretUser = params['userId'];      
    })
  }


  //Get User from Backend
  private _getUserData(){
    this.usersService.getUser(this.curretUser).pipe(takeUntil(this.endSubs$)).subscribe(user => {      
      this.user = user;
      this.selectedStatus = user.isActive;
      if(user.isSeller){        
        this._getStoreData(user.id);
      }
      
    })    

  }




  //Change User status
  onStatusChange(event){
    this.confirmationService.confirm({
      message: 'Do you want to Change the Status of this User ?',
      header: 'Change User Status',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {       

    this.usersService.updateUserActive({isActive: event.value}, this.curretUser).pipe(takeUntil(this.endSubs$)).subscribe((user)=>{
      if(user){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `User Status Updated Successfully..` });        
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `User Status is NOT Updated !!!!` });
      }
    },() => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `User Status is NOT Updated !!!!` });

    })
        
      },
    }); 
    

  }


  //Get store Data id User == isSeller
  private _getStoreData(userId){
    this.storesService.getUserStore(userId).pipe(takeUntil(this.endSubs$)).subscribe(store => {            
      this.store = store[0];     
    })

  }  



  ngOnDestroy(): void {
    this.endSubs$.next(2);
  }

}
