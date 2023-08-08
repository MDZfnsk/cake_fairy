import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Rating } from '../models/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {
  apiURLRatings = environment.apiURL + 'ratings';

  constructor(private http: HttpClient) { }

   //Get store by User ID
   getRatingsByStore(storeId: string): Observable<Rating[]> {    
    return this.http.get<Rating[]>(`${this.apiURLRatings}/store/${storeId}`);
  }

  //Post new rating
   //Create a new Order
   createReview(review: Rating): Observable<Rating> {
    return this.http.post<Rating>(this.apiURLRatings, review);
  }


}
