import {
    createAction,
    props,
 } from '@ngrx/store';

import {
    IBook,
    IFilter,
} from '../../types/books.type';

export const loadBooks = createAction(
    '[Books API] Load Books',
);

export const bookLoadSuccess = createAction(
    '[Books API] Load Books Success',
    props<{ books: IBook[] }>()
);

export const updateFilters = createAction(
    '[Filters Form] Update',
    props<{ value: IFilter }>()
);

export const clearFilters = createAction(
    '[Filters Form] Clear',
);