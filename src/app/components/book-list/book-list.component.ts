import {
  Component, 
  OnInit
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadBooks } from '../../store/actions/dashboard.actions';
import { AppState } from '../../store/reducers';
import { getBooks } from '../../store/selectors/dashboard.selectors';
import { IBook } from '../../types/books.type';

/**
 * @description Component for booklist.
 * 
 * @author Aravindh Nagarajan
 */
@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.less']
})
export class BookListComponent implements OnInit {
  /**
   * Booklist observable.
   */
  public readonly bookList$: Observable<IBook[]>;
  
  constructor(private readonly store: Store<AppState>) {
    this.bookList$ = store.select(getBooks);
  }

  public ngOnInit(): void {
    this.store.dispatch(loadBooks());
  }
}
