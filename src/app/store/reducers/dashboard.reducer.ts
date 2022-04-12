import {
    Action,
    createReducer,
    on,
} from '@ngrx/store';

import {
    bookLoadSuccess, 
    clearFilters
} from '../actions/dashboard.actions';

import {
    IAppState, 
    RatingBase,
} from '../../types/books.type';

export const dashboardFeatureKey = 'dashboard';

export const initialState: IAppState = {
    books: [],
    filters: {
        ratingBase: RatingBase.equal,
    },
};

const dashboardStateReducer = createReducer(
    initialState,
    on(bookLoadSuccess, (state, params) => 
        ({ ...state,
           books: params.books,
        })
    ),
    on(clearFilters, (state) => 
        ({ ...state,
            filters: {
                ratingBase: RatingBase.equal,
            },
        })
    ),
);

/**
 * Reducer for dashboard state.
 */
export function reducer(state: IAppState | undefined, action: Action) {
    return dashboardStateReducer(state, action);
}
  