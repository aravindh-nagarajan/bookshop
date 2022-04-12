import { AppState } from '../reducers';
import { createSelector } from '@ngrx/store';

export const selectBooksState = (state: AppState) => state.books;

export const getBooks = createSelector(
    selectBooksState,
    bookList => bookList.books,
);
