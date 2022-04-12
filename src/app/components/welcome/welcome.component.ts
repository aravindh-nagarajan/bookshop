import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { logout } from '../../store/actions/login.actions';
import { AppState } from '../../store/reducers';
import { getEmail } from '../../store/selectors/login.selectors';

/**
 * @description Component to display welcome user banner.
 * 
 * @author Aravindh Nagarajan
 */
@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent {
  /**
   * Email observable
   */
  public readonly email$: Observable<string>;

  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router,
  ) {
    this.email$ = this.store.select(getEmail);
  }

  /**
   * Logout user.
   */
  public logoutUser(): void {
    this.store.dispatch(logout());

    this.router.navigateByUrl('/login');
  }
}
