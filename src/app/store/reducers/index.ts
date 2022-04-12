import { ActionReducerMap } from '@ngrx/store';
import * as login from './login.reducer';
import * as dashboard from './dashboard.reducer';
import { IAppState } from '../../types/books.type';

export interface AppState {
    [login.loginFeatureKey]: login.ILoginState;
    [dashboard.dashboardFeatureKey]: IAppState;
}

/**
 * Reducer for app state.
 */
export const reducers: ActionReducerMap<AppState> = {
    [login.loginFeatureKey]: login.reducer,
    [dashboard.dashboardFeatureKey]: dashboard.reducer,
};
