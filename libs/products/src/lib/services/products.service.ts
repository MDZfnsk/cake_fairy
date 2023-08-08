import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  apiURLProducts = environment.apiURL + 'products' ;

  constructor(
    private http: HttpClient
  ) { }

  //Getting all Products if Params available get Products from selected Categories
  getProducts(categoriesFilter?: string[]): Observable<Product[]>{
    let params = new HttpParams();
    if(categoriesFilter){
      params = params.append('categories', categoriesFilter.join(','));      
    }
    return this.http.get<Product[]>(this.apiURLProducts, {params: params});
  } 

  //Get products by text search 
  getFromTextSearch(searchString: string): Observable<Product[]> {
		return this.http.get<Product[]>(`${this.apiURLProducts}/search/searchby?search=${searchString}`);
	}

  

  //Get one Product
  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
  }


  //Get products by Store ID
  getProductsByStoreId(storeId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURLProducts}/store/${storeId}`);
  }

  //Get Products count
  getProductCount(): Observable<object>{
    return this.http.get<object>(`${this.apiURLProducts}/get/count`)
  }  

  //Create a new Product
  createProduct(productData: FormData): Observable<Product>{
    return this.http.post<Product>(this.apiURLProducts, productData);
  }

  //Update product
  updateProduct(productData: FormData, productId: string): Observable<Product>{
    return this.http.put<Product>(`${this.apiURLProducts}/${productId}`, productData);
  }

  //Detele Product
  deleteProduct(productId: string): Observable<any>{
    return this.http.delete<any>(`${this.apiURLProducts}/${productId}`);
  }



   



  
}
