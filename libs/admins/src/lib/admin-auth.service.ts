import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Admin } from './models/admin';
import { AdminLocalstorageService } from './admin-localstorage.service';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {  

  
  apiURLAdmins = environment.apiURL + 'admins';

  constructor(
    private http: HttpClient,    
    private router: Router,
    private adminLocalStorageService: AdminLocalstorageService
  ) { }

  login(email: string, password: string): Observable<Admin> {
    return this.http.post<Admin>(`${this.apiURLAdmins}/login`,{email,password});
  }


  logout(){
    this.adminLocalStorageService.removeToken();
    this.router.navigate(['/login']);
  }


  
}
