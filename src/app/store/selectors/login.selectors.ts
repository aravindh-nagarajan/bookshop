import { AppState } from '../reducers';
import { createSelector } from '@ngrx/store';

export const selectLoginState = (state: AppState) => state.login;

/**
 * Selector to get isLoggedIn.
 */
export const getIsLoggedIn = createSelector(
    selectLoginState,
    loginState => loginState.isLoggedIn,
);

/**
 * Selector to get email.
 */
export const getEmail = createSelector(
    selectLoginState,
    loginState => loginState.email,
);
