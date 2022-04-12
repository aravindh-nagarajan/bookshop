import { Component, Input, OnInit } from '@angular/core';
import { IBook } from '../../types/books.type';
import { DateTime } from 'luxon';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.less']
})
export class BookComponent {
  @Input()
  book: IBook = {} as IBook;

  isOpen = false;

  constructor() { }

  get date() {
    return DateTime
      .fromFormat(this.book.publishedDate, 'dd-MM-yyyy')
      .toFormat('MM-dd-yyyy');
  }

  get rating() {
    return Array(this.book.rating);
  }

  togglePopup(open = true) {
    this.isOpen = open;
  }

  get available() {
    return this.book.available ? 'Yes' : 'No';
  }
}
