import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';
import { OrdersService } from 'libs/orders/src/lib/services/orders.service';
import { Rating } from '../../models/rating';
import { RatingsService } from '../../services/ratings.service';

@Component({
  selector: 'stores-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit, OnDestroy {

  isSubmitted = false;
  currentUserId;
  currentStoreId;
  currentOrderId;
  form: FormGroup;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private ratingsService: RatingsService,
    private router: Router
  ) {}
  
 

  ngOnInit(): void {
    this._getCurrentOrderId();    
    this._initForm();  
    
  }


  //Getting current order details
  private _getCurrentOrderId(){
    this.route.params.subscribe(params => {
      this._getCurrentOrderDetails(params.orderId);              
    });

  }



  //Getting Order Details
  private _getCurrentOrderDetails(orderId){
    this.ordersService.getOrder(orderId).pipe(takeUntil(this.endSubs$)).subscribe(order => {
      console.log(order);
      this.currentUserId = order.user.id;
      this.currentStoreId = order.product.store.id;       
      
    })

  }

  //Inintiating Store form
  private _initForm() {
    this.form = this.formBuilder.group({
      rating: ['', Validators.required],
      comment: ['', Validators.required]      
    });
  }


 

 

  placeReview() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const review: Rating = {
      user: this.currentUserId,
      store: this.currentStoreId,
      rating: this.reviewForm.rating.value,
      comment: this.reviewForm.comment.value,
      dateCreated: `${Date.now()}`      
    };

    console.log(review);
    if(review) {
      this.ratingsService.createReview(review).pipe(takeUntil(this.endSubs$)).subscribe(rating => {
        console.log(rating);

        if(rating){
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Review Added Successfully..',
          });         
          timer(1500)
            .toPromise()
            .then(() => {
              this.router.navigateByUrl(``);
            });
        }
        
      })
    }  
    
  }


  //Navigate back
  goBackPage(){
    this.location.back();

  }

  //Getters for FormControls
  get reviewForm() {
    return this.form.controls;
  }

  ngOnDestroy(): void {
    this.endSubs$.next(2);
  }


}
