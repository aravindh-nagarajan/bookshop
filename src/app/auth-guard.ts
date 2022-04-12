import { 
  ActivatedRouteSnapshot, 
  CanActivate,
  Router,
  RouterStateSnapshot, 
  UrlTree, 
} from "@angular/router";

import {
  map, 
  Observable,
} from "rxjs";

import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "./store/reducers";

/**
 * Service to guard dashboard route.
 */
@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
      private readonly store: Store<AppState>,
      private readonly router: Router,
    ) {}

  canActivate(): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return this.store.select(appState => appState.login.isLoggedIn)
      .pipe(map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login'])
        }

        return isLoggedIn;
      }))
  }
}
