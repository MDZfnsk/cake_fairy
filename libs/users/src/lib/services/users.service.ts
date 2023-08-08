
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '@env/environment';
import { UsersFacade } from '../state/users.facade';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiURLUsers = environment.apiURL + 'users';

  constructor(
      private http: HttpClient,
      private usersFacade: UsersFacade
      ) {}

  //Get all users
  getUsers(): Observable<User[]> {
      return this.http.get<User[]>(this.apiURLUsers);
  }

  //Get selected User
  getUser(userId: string): Observable<User> {
      return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
  }

  //Get User Count
  getUserCount(): Observable<object>{
      return this.http.get<object>(`${this.apiURLUsers}/get/count`)
    }

  //Create new User
  createUser(user: User): Observable<User> {
      return this.http.post<User>(`${this.apiURLUsers}/register`, user);
  }

  //Update User
  updateUser(user: User, userId: string): Observable<User> {
      return this.http.put<User>(`${this.apiURLUsers}/${userId}`, user);
  }

  //Delete a User
  deleteUser(userId: string): Observable<any> {
      return this.http.delete<any>(`${this.apiURLUsers}/${userId}`);
  }

 


  //Update User Activeness
  updateUserActive(userStatus:{isActive: boolean}, userId: string): Observable<User>{
    return this.http.put<User>(`${this.apiURLUsers}/updateactive/${userId}`, userStatus);
  }
  

  initAppSession() {
      this.usersFacade.buildUserSession();      
  }


  //Accessing Users State Store
  observeCurrentUSer() {       
      return this.usersFacade.currentUser$;
  }

  isCurrentUserAuthenticated() {
      return this.usersFacade.isAuthenticated;
  }



}
