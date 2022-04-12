import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadBooks } from '../../store/actions/book.actions';
import { AppState } from '../../store/reducers';
import { getBooks } from '../../store/selectors/books.selectors';
import { IBook } from '../../types/books.type';

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.less']
})
export class BookListComponent implements OnInit {
  public bookList$: Observable<IBook[]>;
  
  constructor(private store: Store<AppState>) {
    this.bookList$ = store.select(getBooks);
  }

  ngOnInit(): void {
    this.store.dispatch(loadBooks());
  }
}


