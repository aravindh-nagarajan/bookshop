import { ActionReducerMap } from '@ngrx/store';
import * as login from './login.reducer';
import * as books from './books.reducer';
import { IAppState } from '../../types/books.type';

export interface AppState {
    [login.loginFeatureKey]: login.ILoginState;
    [books.booksFeatureKey]: IAppState;
}

export const reducers: ActionReducerMap<AppState> = {
    [login.loginFeatureKey]: login.reducer,
    [books.booksFeatureKey]: books.reducer,
};