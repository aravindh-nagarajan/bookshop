import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';

export const selectDashboardState = (state: AppState) => state.dashboard;

/**
 * Selector to get books.
 */
export const getBooks = createSelector(
    selectDashboardState,
    dashboardState => dashboardState.books,
);
