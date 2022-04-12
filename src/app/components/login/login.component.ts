import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../../store/reducers';
import { getIsLoggedIn } from '../../store/selectors/login.selectors';
import { login } from '../../store/actions/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  public emailAddress = '';

  public loginSubscription: Subscription | undefined;

  public isLoggedIn$: Observable<boolean>;

  constructor(
    private readonly router: Router,
    private store: Store<AppState>,
  ) {
    this.isLoggedIn$ = this.store.pipe(select(getIsLoggedIn));
  }

  public ngOnInit(): void {
    this.loginSubscription = this.isLoggedIn$.subscribe(
     this.loginHandler.bind(this)
    );
  }

  public ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  public signIn(email = this.emailAddress): void {
    this.store.dispatch(login({ email }));
  }

  private loginHandler(isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.router.navigateByUrl('/home');
    }
  }
}
