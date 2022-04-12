import {
    createAction,
    props,
 } from '@ngrx/store';

import {
    IBook,
    IFilter,
} from '../../types/books.type';

/**
 * Action to load books.
 */
export const loadBooks = createAction(
    '[Books API] Load Books',
);

/**
 * Action to convey load books success.
 */
export const bookLoadSuccess = createAction(
    '[Books API] Load Books Success',
    props<{ books: IBook[] }>()
);

/**
 * Action to filter books.
 */
export const updateFilters = createAction(
    '[Filters Form] Update',
    props<{ value: IFilter }>()
);

/**
 * Action to clear filters.
 */
export const clearFilters = createAction(
    '[Filters Form] Clear',
);
