import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminLocalstorageService } from './admin-localstorage.service';
import { environment } from '@env/environment';


@Injectable()
export class AdminJwtInterceptor implements HttpInterceptor {

  constructor(
    private adminLocalStorageService: AdminLocalstorageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token =  this.adminLocalStorageService.getToken();
    const isApiURL = request.url.startsWith(environment.apiURL);

    if(token && isApiURL){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }

    return next.handle(request);
  }
}
