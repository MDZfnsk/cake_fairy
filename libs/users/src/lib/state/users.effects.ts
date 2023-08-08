import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, concatMap, map } from 'rxjs';
import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import { LocalstorageService } from '../services/localstorage.service';
import { UsersService } from '../services/users.service';

@Injectable()
export class UsersEffects {

     private actions$ = inject(Actions);
     private localstorageSerivce = inject(LocalstorageService);
     private usersService = inject(UsersService); 

    



buildUserSession$ = createEffect(() => this.actions$.pipe(  
    ofType(UsersActions.buildUserSession),
    concatMap(()=> {
        if(this.localstorageSerivce.isValidToken()) {
            const userId =this.localstorageSerivce.getUserIdFromToken();
            if(userId){
                return this.usersService.getUser(userId).pipe(map((user)=> {                 
                    return UsersActions.buildUserSessionSuccess({user: user})
                }),catchError(() => of(UsersActions.buildUserSessionFailed()) ))
            }else{
                return of(UsersActions.buildUserSessionFailed());
            }
        }else {
            return of(UsersActions.buildUserSessionFailed());
        }
    })
))

  
}
