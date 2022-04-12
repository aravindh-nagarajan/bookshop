import {
  Component,
  OnInit,
} from '@angular/core';

import {
  Observable, 
  Subscription } from 'rxjs';

import {
  Store, 
  select,
} from '@ngrx/store';

import { Router } from '@angular/router';
import { AppState } from '../../store/reducers';
import { getIsLoggedIn } from '../../store/selectors/login.selectors';
import { login } from '../../store/actions/login.actions';

/**
 * @description Login component.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  /**
   * Model for email address.
   */
  public emailAddress = '';

  /**
   * LoggedIn subscription.
   */
  public loginSubscription: Subscription | undefined;

  /**
   * LoggedIn observable.
   */
  public readonly isLoggedIn$: Observable<boolean>;

  constructor(
    private readonly router: Router,
    private store: Store<AppState>,
  ) {
    this.isLoggedIn$ = this.store.select(getIsLoggedIn);
  }

  /**
   * Creates subscription.
   */
  public ngOnInit(): void {
    this.loginSubscription = this.isLoggedIn$.subscribe(
     this.loginHandler.bind(this)
    );
  }

  /**
   * Destroys subscription.
   */
  public ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  /**
   * Performs login.
   */
  public signIn(email = this.emailAddress): void {
    this.store.dispatch(login({ email }));
  }

  /**
   * On successful login.
   */
  private loginHandler(isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
