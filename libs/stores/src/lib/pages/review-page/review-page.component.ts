import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RatingsService } from '../../services/ratings.service';
import { Subject, takeUntil } from 'rxjs';
import { Location } from '@angular/common';



@Component({
  selector: 'stores-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss']
})
export class ReviewPageComponent implements OnInit, OnDestroy {
 
 
  name = "nigga";
  storeReviews;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private ratingsService: RatingsService,
    private location: Location
  ) {}


  ngOnInit(): void {
      this._getCurrentStoreID();
      
  }

  //Get Current Store ID from Route Params
  private _getCurrentStoreID(){
    this.route.params.subscribe(params => {      
      this._getRatingsForStore(params.storeId)      
    })
    
  }


  //Getiing Ratings for the Current Store
  private _getRatingsForStore(storeId){
    this.ratingsService.getRatingsByStore(storeId).pipe(takeUntil(this.endSubs$)).subscribe(reviews => {
     this.storeReviews = reviews      
    })  

  }



  goBackPage(){
    this.location.back();

  }


  ngOnDestroy(): void {
    this.endSubs$.next(2);
  }



}
