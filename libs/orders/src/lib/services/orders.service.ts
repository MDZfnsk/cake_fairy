import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Order } from '../models/order';
import { environment } from '@env/environment';
import { StripeService } from 'ngx-stripe';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  apiURLOrders = environment.apiURL + 'orders';
  apiURLProducts = environment.apiURL + 'products';

  constructor(
    private http: HttpClient, 
    private stripeService: StripeService
    ) {}

  //Create a new Order
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiURLOrders, order);
  }

  // //Getting all Orders
  // getOrders(): Observable<Order[]>{
  //   return this.http.get<Order[]>(this.apiURLOrders);
  // }

  //Get one Order
  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
  }

  //Get all orders by a specific User
  getOrdersByUser(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiURLOrders}/userorders/${userId}`);
  }

  //Get all orders by a specific Store
  getOrdersByStore(storeId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiURLOrders}/storeorders/${storeId}`);
  }

  //Get all "Pending" orders by a specific Store
  getPendingOrdersByStore(storeId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiURLOrders}/storeordercount/pending/${storeId}`);
  }

  //Update order
  updateOrder(orderStatus: { status: string },orderId: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`, orderStatus);
  }

  //Get Total Sales for a Specific store
  getTotalSalesforStore(storeId: string): Observable<object> {
    return this.http.get<object>(`${this.apiURLOrders}/storetotalsales/${storeId}`);
  }

  //Get Order count for a specific store
  getOrderCountbyStore(storeId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURLOrders}/storeordercount/${storeId}`);
  }

  //Get Order Count
  getOrderCount(): Observable<object> {
    return this.http.get<object>(`${this.apiURLOrders}/get/count`);
  }

  //Get Total Sales
  getTotalSales(): Observable<object> {
    return this.http.get<object>(`${this.apiURLOrders}/get/totalsales`);
  }

  //  //Detele Order
  //  deleteOrder(orderId: string): Observable<any>{
  //   return this.http.delete<any>(`${this.apiURLOrders}/${orderId}`);
  // }

  //Get one Product (Using This method to overcome the Circular Dependancy Issue)
  getProduct(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURLProducts}/${productId}`);
  }

  // //Creating checkout session using Stripe
  // createCheckoutSession(orderItems: any) {
  //   return this.http.post(`${this.apiURLOrders}/create-checkout-session`, orderItems);
  // }

  //Creating checkout session using Stripe
  createCheckoutSession(orderItems: any) {
    return this.http.post(`${this.apiURLOrders}/create-checkout-session`, orderItems).pipe(switchMap((session: { id: string }) => {
          return this.stripeService.redirectToCheckout({
            sessionId: session.id,
          });
        })
      );
  }

  //caching order data before redirecting to the payment page
  cacheOrderData(order: Order) {
    localStorage.setItem('orderData', JSON.stringify(order));
  }

  //Getting order items from cache
  getCachedOrderData(): Order {
    return JSON.parse(localStorage.getItem('orderData'));
  }

  //remove cached Order Data
  removeCachedOrderData() {
    localStorage.removeItem('orderData');
  }
}
