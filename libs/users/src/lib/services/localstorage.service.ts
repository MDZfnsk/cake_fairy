import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  

  
  constructor() { }

  setToken(data){
    localStorage.setItem(TOKEN,data);
  }


  getToken(){
    return localStorage.getItem(TOKEN);
  }


  removeToken(){
    localStorage.removeItem(TOKEN);
  }


  //Will be used in Session Store Effects to validate the Token
  isValidToken() {    
    const token = this.getToken();
    if(token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return !this._tokenexpired(tokenDecode.exp)
    }else {
      return false;
    }
  }

  private _tokenexpired(expiration){
    return Math.floor(new Date().getTime()/1000) >= expiration
  }




  //Getting UserId from token
  getUserIdFromToken() {
    const token = this.getToken();
    if(token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if(tokenDecode){
        return tokenDecode.userId;
      }else{
        return null;
      }      
    }else {
      return null;
    }
  }


}
