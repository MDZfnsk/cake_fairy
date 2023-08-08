import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiURLCategories = environment.apiURL + 'categories' ;

  constructor(
    private http: HttpClient
  ) { }

  //Getting all categories
  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.apiURLCategories);
  } 



  // //Get one category
  // getCategory(categoryId: string): Observable<Category> {
  //   return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`);
  // }

  // //Create a new Category
  // createCategory(category: Category): Observable<Category>{
  //   return this.http.post<Category>(this.apiURLCategories,category);
  // }

  // //Update category
  // updateCategory(category: Category): Observable<Category>{
  //   return this.http.put<Category>(`${this.apiURLCategories}/${category.id}`, category);
  // }

  // //Detele Category
  // deleteCategory(categoryId: string): Observable<any>{
  //   return this.http.delete<any>(`${this.apiURLCategories}/${categoryId}`);
  // }

   
}
