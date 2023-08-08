import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil, timer } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductsService } from 'libs/products/src/lib/services/products.service';
import { CategoriesService } from 'libs/products/src/lib/services/categories.service';

@Component({
  selector: 'eshop-store-product-form',
  templateUrl: './store-product-form.component.html',
  styleUrls: ['./store-product-form.component.scss'],
})
export class StoreProductFormComponent {
  editMode = false;
  isSubmitted = false;
  form: FormGroup;
  categories = [];
  imagesDisplay;
  currentStoreId: string;
  currentProductId: string;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private productService: ProductsService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();

    this.route.queryParams.subscribe((params) => {
      if (params['storeId']) {
        this.editMode = false;
        this.currentStoreId = params['storeId'];
      } else {
        this.editMode = true;
        this.currentProductId = params['productId'];
        this._initializeValus();
      }
    });
    
  }

  //Inintiating product form
  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      images: [[], Validators.required],
    });
  }

  //Getting all Categories
  private _getCategories() {
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  //Initializing values to input fields in Edit Mode
  private _initializeValus() {
    this.productService
      .getProduct(this.currentProductId)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((product) => {
        console.log(product.category);
        this.productForm.name.setValue(product.name);
        this.productForm.price.setValue(product.price);
        this.productForm.category.setValue(product.category['id']);
        this.productForm.description.setValue(product.description);
        this.productForm.richDescription.setValue(product.richDescription);
        this.productForm.images;
        this.imagesDisplay = product.images;

        //Disabling validators in edit mode
        this.productForm.images.setValidators([]);
        this.productForm.images.updateValueAndValidity();
      });
  }

  //Submit button click
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const productFormData = new FormData();

    const images = this.productForm.images.value;
    for (let i = 0; i < images.length; i++) {
      productFormData.append('images', images[i]);
    }

    productFormData.append('name', this.productForm.name.value);
    productFormData.append('price', this.productForm.price.value);
    productFormData.append('category', this.productForm.category.value);
    productFormData.append('description', this.productForm.description.value);
    productFormData.append(
      'richDescription',
      this.productForm.richDescription.value
    );
    console.log(this.currentStoreId);
    productFormData.append('store', this.currentStoreId);

    if (this.editMode) {
      productFormData.forEach((value, key) => {
        console.log(key, value);
      });
      this._updateProduct(productFormData, this.currentProductId);
    } else {
      this._createNewProduct(productFormData);
    }
  }

  //Image upload event Handling function
  onImageUpload(event) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const imagesArray = []; // Array to store the files

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        imagesArray.push(file); // Add each file to the array
      }

      this.form.patchValue({ images: imagesArray });
      this.form.get('images').updateValueAndValidity();

      this.imagesDisplay = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.imagesDisplay.push(fileReader.result);
        };
        fileReader.readAsDataURL(file);
      }
    }
  }

  //Create New Product
  private _createNewProduct(productData: FormData) {
    this.productService
      .createProduct(productData)
      .pipe(takeUntil(this.endSubs$))
      .subscribe(
        (product) => {
          if (product) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Product ${product.name} Created Successfully..`,
            });
            timer(2000)
              .toPromise()
              .then(() => {
                this.router.navigateByUrl(
                  `user/store/products/${product.store}`
                );
              });
          }
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product NOT Created !!!',
          });
        }
      );
  }

  //Update Product
  private _updateProduct(productData: FormData, productId: string) {
    this.productService
      .updateProduct(productData, productId)
      .pipe(takeUntil(this.endSubs$))
      .subscribe(
        (product) => {
          console.log(product);
          if (product) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Product ${product.name} Updated Successfully..`,
            });
            timer(2000)
              .toPromise()
              .then(() => {
                this.router.navigateByUrl(
                  `user/store/products/${product.store}`
                );
              });
          }
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product NOT Updated !!!',
          });
        }
      );
  }

  //Cancel button Click
  onCancleClick() {
    this.location.back();
  }

  //Getters for FormControls
  get productForm() {
    return this.form.controls;
  }

  ngOnDestroy(): void {
    this.endSubs$.next(2);
  }
}
