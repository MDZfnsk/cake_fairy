import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { CategoriesService, Product, ProductsService } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';
import { StoresService } from '../../services/stores.service';
import { Store } from '../../models/store';

@Component({
  selector: 'stores-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss'],
})
export class StoreFormComponent implements OnInit, OnDestroy {

  
  editMode = false;
  isSubmitted = false;
  form: FormGroup;
  categories = [];
  imageDisplay: string | ArrayBuffer;
  currentUserId: string;
  currentStoreId: string;
  endSubs$: Subject<any> = new Subject();
  profileImageUrl: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private messageService: MessageService,
    private storesService: StoresService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initForm();

    this.route.queryParams.subscribe(params => {
      if(params['userId']){
        this.editMode = false;       
        this.currentUserId = params['userId'];             
      }else {
        this.editMode = true;
        this.currentStoreId = params['storeId'];
        this._initializeValus();        
      }      
      
    });
    
  }

  //Inintiating Store form
  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      profileImage: ['', Validators.required],
    });
  }


  //Initializing values to input fields if in Edit Mode
  private _initializeValus(){
    this.storesService.getStore(this.currentStoreId).pipe(takeUntil(this.endSubs$)).subscribe(store => {
      this.storeForm.name.setValue(store.name);
      this.storeForm.description.setValue(store.description);
      this.imageDisplay = store.profileImage; 
      
       //Disabling validators in edit mode
       this.storeForm.profileImage.setValidators([]);
       this.storeForm.profileImage.updateValueAndValidity();     

    })   
    
  }


  //Uploading the image file
  onImageUpload(event) {
    const file = event.target.files[0];

    if (file) {
      this.form.patchValue({ profileImage: file });
      this.form.get('profileImage').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const storeFormData = new FormData();
    // productFormData.append('name', this.productForm.name.value);
    Object.keys(this.storeForm).map((key) => {
      // console.log(key);
      // console.log(this.storeForm[key].value);
      storeFormData.append(key, this.storeForm[key].value);
    });
    storeFormData.append('owner', this.currentUserId);

    if(this.editMode){
      this._updateStore(storeFormData,this.currentStoreId);
      
    }else {     
      this._addStore(storeFormData);      
    }
    
  }



  //Create new Store
  private _addStore(storeData: FormData) {
    this.storesService
      .createStore(storeData)
      .pipe(takeUntil(this.endSubs$))
      .subscribe(
        (store: Store) => {
          if (store) {
            console.log(store);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Store ${store.name} Created Successfully..`,
            });
            timer(2000)
              .toPromise()
              .then(() => {
                this.router.navigateByUrl(`user/store/${store.id}`);                
              });
          }
        },
        (error) => {
          if (error.error.error.keyValue.name) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Store name ${error.error.error.keyValue.name} already Exist !!!`,
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Store NOT Created !!!',
            });
          }
        }
      );
  }



  //Update store
  private _updateStore(storeFormData: FormData,storeId: string){
    this.storesService.updateStore(storeFormData,storeId).pipe(takeUntil(this.endSubs$)).subscribe((store) => {
      if (store) {
        console.log(store);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Store ${store.name} Updated Successfully..`,
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.router.navigateByUrl(`user/store/${store.id}`);            
          });
      } 
    }, (error) => {

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Store NOT Created !!!',
      });
      
    }  
    
    )

  }




  //Navigate back
  onCancleClick() {
    this.location.back();
  }

  //Getters for FormControls
  get storeForm() {
    return this.form.controls;
  }

  ngOnDestroy(): void {
    this.endSubs$.next(2);
  }
}
