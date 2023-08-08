import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../models/order';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { User, UsersService } from '@cakefairy/users';
import { Subject, takeUntil } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  productId;
  itemQuantity;
  userId;
  user: User;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this._getOrderDetails();
    this._initCheckoutForm();
    this._autoFillUserData();
  }

  //Get Order Details from URL
  private _getOrderDetails() {
    this.route.queryParams.subscribe((params) => {
      this.productId = params['productId'];
      this.itemQuantity = params['quantity'];
    });
  }

  //Initializing Checkout form
  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  //Auto filling user infon in the Checkout page form
  private _autoFillUserData() {
    this.usersService
      .observeCurrentUSer()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((user) => {
        if (user) {
          this.user = user;
            this.userId = user.id,
            this.checkoutForm.name.setValue(user.name),
            this.checkoutForm.email.setValue(user.email),
            this.checkoutForm.phone.setValue(user.phone),
            this.checkoutForm.city.setValue(user.city),
            this.checkoutForm.street.setValue(user.street),
            this.checkoutForm.district.setValue(user.district),
            this.checkoutForm.zip.setValue(user.zip),
            this.checkoutForm.apartment.setValue(user.apartment);
        } else {
          console.log('No User in Session Store');
        }
      });
  }

  //Place Order Button click
  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order: Order = {
      product: this.productId,
      quantity: this.itemQuantity,
      apartment: this.checkoutForm.apartment.value,
      city: this.checkoutForm.city.value,
      zip: this.checkoutForm.zip.value,
      district: this.checkoutForm.district.value,
      phone: this.checkoutForm.phone.value,
      status: 0, //as this is the creation of order
      user: this.userId,
      dateOrdered: `${Date.now()}`,
    };

    this.ordersService.cacheOrderData(order);
    // this.ordersService.createOrder(order).subscribe(order => {
    //   console.log(order);
    //   this.cartService.removeCartItem(this.productId);
    // })

    const orderItems = {
      product: this.productId,
      quantity: this.itemQuantity
    };

    this.ordersService.createCheckoutSession(orderItems).subscribe(result=> {
        console.log(result);        
    });

    // this.ordersService.createCheckoutSession(this.orderItems).subscribe(error => {
    //     if(error){
    //         console.log("error in redirect to payment");
    //     }
    // });
  }

  //Navigate user back to cart
  backToCart() {
    // this.router.navigate(['/']);
    this.location.back();
  }

  //Getter for Form Controls
  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

  ngOnDestroy(): void {
    this.endSubs$.next(2);
  }
}
