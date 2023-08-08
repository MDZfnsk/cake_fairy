import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {
  
  private readonly store = inject(Store);
  
  currentUser$ = this.store.pipe(select(UsersSelectors.getUser));
  isAuthenticated = this.store.pipe(select(UsersSelectors.getUserIsAuth));

  buildUserSession() {
    this.store.dispatch(UsersActions.buildUserSession());
  }
}
