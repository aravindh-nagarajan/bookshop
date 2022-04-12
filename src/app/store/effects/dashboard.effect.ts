import { Injectable } from '@angular/core';

import {
  Actions, 
  ofType, 
  createEffect,
} from '@ngrx/effects';

import {
  map, 
  mergeMap,
} from 'rxjs/operators';

import {
  bookLoadSuccess, 
  loadBooks, 
  updateFilters,
} from '../actions/dashboard.actions';

import { BooksService } from '../../books.service';
import { IBook } from '../../types/books.type';

/**
 * @description Class containing effects to load and filter books.
 * 
 * @author Aravindh Nagarajan
 */
@Injectable()
export class DashboardEffect {
  public readonly loadBooks = createEffect(() => this.actions
    .pipe(
        ofType(loadBooks),
        mergeMap(() => this.bookService.filterBooks()
            .pipe(
                map(bookPayload => bookLoadSuccess({ books: bookPayload })),
            )
        )
      )
  );

  public readonly filterBooks = createEffect(() => this.actions
    .pipe(
      ofType(updateFilters),
      mergeMap((payload) => this.bookService.filterBooks(payload.value)
          .pipe(
              map((bookPayload: IBook[]) => bookLoadSuccess({ books: bookPayload })),
          )
      )
    )
);

  constructor(
    private readonly actions: Actions,
    private readonly bookService: BooksService,
  ) {}
}
