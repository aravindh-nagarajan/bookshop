import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { logout } from '../../store/actions/login.actions';
import { AppState } from '../../store/reducers';
import { getEmail } from '../../store/selectors/login.selectors';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent {
  public email$: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private readonly router: Router,
  ) {
    this.email$ = this.store.select(getEmail);
  }

  logoutUser(): void {
    this.store.dispatch(logout());

    this.router.navigateByUrl('/login');
  }
}
