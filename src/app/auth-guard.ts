import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { AppState } from "./store/reducers";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
      private store: Store<AppState>,
      private router: Router,
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return this.store.select(appState => appState.login.isLoggedIn)
      .pipe(map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login'])
        }
        return isLoggedIn;
      }))
  }
}