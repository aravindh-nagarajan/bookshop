import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { withLatestFrom, exhaustMap, filter, map, catchError, mergeMap } from 'rxjs/operators';
import { BooksService } from '../../books.service';
import { getBooks } from '../selectors/books.selectors';
import { AppState } from '../reducers';
import { bookLoadSuccess, loadBooks, updateFilters } from '../actions/book.actions';
import { of } from 'rxjs';
import { IBook, IFilter } from '../../types/books.type';

@Injectable()
export class BooksEffect {
  loadBooks$ = createEffect(() => this.actions$
    .pipe(
        ofType(loadBooks),
        withLatestFrom(this.store.select(getBooks)),
        mergeMap(() => this.bookService.filterBooks()
            .pipe(
                map(bookPayload => bookLoadSuccess({ books: bookPayload })),
            )
        )
      )
  );

  filterBooks = createEffect(() => this.actions$
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
    private actions$: Actions,
    private bookService: BooksService,
    private store: Store<AppState>,
  ) {}
}


