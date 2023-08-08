import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AdminLocalstorageService } from './admin-localstorage.service';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  
  
  constructor(
    private router: Router,
    private adminLocalstorageService: AdminLocalstorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   

    const token = this.adminLocalstorageService.getToken();

    if(token){      
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));


      // if(tokenDecode.role && !this._tokenexpired(tokenDecode.exp))

      if(!this._tokenexpired(tokenDecode.exp)){             
        return true;
      }else {
        this.router.navigate(['/login']);        
        return false;
      }   
      
    }else {      
    this.router.navigate(['/login']);
    return false;
    }
  }

  private _tokenexpired(expiration){

    return Math.floor(new Date().getTime()/1000) >= expiration

  }


}
