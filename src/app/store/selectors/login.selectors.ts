import { AppState } from '../reducers';
import { createSelector } from '@ngrx/store';

export const selectLoginState = (state: AppState) => state.login;

export const getIsLoggedIn = createSelector(
    selectLoginState,
    login => login.isLoggedIn,
);

export const getEmail = createSelector(
    selectLoginState,
    login => login.email,
);
