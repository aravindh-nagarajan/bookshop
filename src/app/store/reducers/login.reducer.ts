import {
    Action,
    createReducer,
    on,
} from '@ngrx/store';

import {
    login, 
    logout,
} from '../actions/login.actions';

export const loginFeatureKey = 'login';

export interface ILoginState {
    email: string;
    isLoggedIn: boolean;
}

export const initialState: ILoginState = {
    email: '',
    isLoggedIn: false,
};

const loginStateReducer = createReducer(
    initialState,
    on(login, (state, params) => ({ ...state, isLoggedIn: true, email: params.email})),
    on(logout, state => ({ ...state, isLoggedIn: false, email: '' }))
);

/**
 * Reducer for login state.
 */
export function reducer(state: ILoginState | undefined, action: Action) {
    return loginStateReducer(state, action);
}
