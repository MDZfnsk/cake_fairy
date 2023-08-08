import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'users-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  
  form: FormGroup;
    isSubmitted = false;
    isSeller = false;
    editMode = false;
    currentUserId: string;
    countries = [];
    endSubs$: Subject<any> = new Subject();

    constructor(
      private location: Location,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private usersService: UsersService,
      private messageService: MessageService ) {}

    ngOnInit(): void {
        this._initForm();       
        this._setInputFields();
    }

    //Initializing Controlls to Form
    private _initForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],           
            street: [''],
            apartment: [''],
            zip: [''],
            city: [''],
            district: ['']
        });
    }

    


    //Assigning values to input elements
    private _setInputFields() {
      this.route.params.subscribe((params) => {
        if (params.id) {          
          this.currentUserId = params.id;
          this.usersService.getUser(params.id).pipe(takeUntil(this.endSubs$)).subscribe((user) => {
            this.userForm.name.setValue(user.name);
            this.userForm.email.setValue(user.email);
            this.userForm.phone.setValue(user.phone);
            // this.userForm.isSeller.setValue(user.isSeller);
            this.userForm.district.setValue(user.district);
            this.userForm.street.setValue(user.street);
            this.userForm.apartment.setValue(user.apartment);
            this.userForm.zip.setValue(user.zip);
            this.userForm.city.setValue(user.city);            
  
            this.userForm.password.setValidators([]);
            this.userForm.password.updateValueAndValidity();

            if(user.isSeller){
              this.isSeller = true;
            }
          });
        }
      });
    }


    onSubmit() {
      this.isSubmitted = true;
      if(this.form.invalid){
        return;      }

      //Creating user object
      const user: User = {       
        name: this.userForm.name.value,
        email: this.userForm.email.value,
        password: this.userForm.password.value,
        phone: this.userForm.phone.value,        
        street: this.userForm.street.value,
        apartment: this.userForm.apartment.value,
        zip: this.userForm.zip.value,
        city: this.userForm.city.value,
        district: this.userForm.district.value       
      };

    
      this._createNewUser(user);
      // this._updateUser(user,this.currentUserId);    
   }   


   //Update existing user
   private _updateUser(user,userId){

    this.usersService.updateUser(user,userId).pipe(takeUntil(this.endSubs$)).subscribe((user) =>{
      if(user){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `User ${user.name} Updated Successfully..` });
        timer(2000).toPromise().then(() => {
          this.location.back();
        })
      }
    },(error)=>{      
      if(error.error.error.keyValue.email){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User with same Email exist !!!' });
      }else if(error.error.error.keyValue.phone){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User with same Number exist !!!' });
      }else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User NOT Updated !!!' });
      }
    });

  }

  private _createNewUser(user: User){
    console.log();
    
    this.usersService.createUser(user).subscribe(user => {
      if(user){
        this.messageService.add({ severity: 'success', summary: 'Account Created', detail: `Hello ${user.name} Please login to continue..` });
        timer(3000).toPromise().then(() => {
          this.router.navigateByUrl(`login`);           
        })
      }
    },(error)=>{      
      console.log(error.error.error.errors.phone);      
      if(error){
        if(error.error.error.errors.email){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User with same Email exist !!!' });
        }else if(error.error.error.errors.phone){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User with same Number exist !!!' });
        }else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User NOT Updated !!!' });
        }
      }
    }
    )
  }



    onCancleClick() {
        this.location.back();
    }

 


    //get Form control function
    get userForm() {
        return this.form.controls;
    }


    ngOnDestroy(): void {
      this.endSubs$.next(2);
    }


}
