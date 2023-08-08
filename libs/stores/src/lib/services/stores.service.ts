import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../models/store';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  apiURLStores = environment.apiURL + 'stores';

  constructor(private http: HttpClient) {}

  //Create new Store
  createStore(store: FormData): Observable<Store> {
    return this.http.post<Store>(this.apiURLStores, store);
  }

  //Get all stores
  getAllStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.apiURLStores);
  }

  //Get store by ID
  getStore(storeId: string): Observable<Store> {
    return this.http.get<Store>(`${this.apiURLStores}/${storeId}`);
  }

  //Get store by User ID
  getUserStore(userId: string): Observable<Store> {
    return this.http.get<Store>(`${this.apiURLStores}/user/${userId}`);
  }

  //Update Store
  updateStore(storeData: FormData, storeId: string): Observable<Store> {
    return this.http.put<Store>(`${this.apiURLStores}/${storeId}`, storeData);
  }

  //Delete Store
  deleteStore(storeId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLStores}/${storeId}`);
  }

  //Get store Count
  getStoreCount(): Observable<object> {
    return this.http.get<object>(`${this.apiURLStores}/get/count`);
  }
}
