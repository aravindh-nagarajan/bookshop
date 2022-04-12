import {
    Action,
    createReducer,
    on,
} from '@ngrx/store';
import { bookLoadSuccess, clearFilters } from '../actions/book.actions';

import {
    login, 
    logout,
} from '../actions/login.actions';

import { IAppState, IBookList, RatingBase } from '../../types/books.type';

export const booksFeatureKey = 'books';

export const initialState: IAppState = {
    books: [],
    filters: {
        ratingBase: RatingBase.equal,
    },
};

const booksStateReducer = createReducer(
    initialState,
    on(bookLoadSuccess, (state, params) => 
        ({ ...state,
           books: params.books,
        })
    ),
    on(clearFilters, (state, params) => 
        ({ ...state,
            filters: {
                ratingBase: RatingBase.equal,
            },
        })
    ),
);
  
export function reducer(state: IAppState | undefined, action: Action) {
    return booksStateReducer(state, action);
}

  