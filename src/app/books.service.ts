import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DateTime } from 'luxon';

import { 
  IBook, 
  IFilter, 
  RatingBase,
} from './types/books.type';

import * as books from './books.json';

/**
 * @desc Service to load books and filter books.
 * 
 * @author Aravindh Nagarajan
 */
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(private readonly httpClient: HttpClient) { }

  /**
   * Filter books based on conditions.
   */
  public filterBooks(filters: IFilter = {}): Observable<IBook[]> {
    const source = { 
      ...books,
    };

    if (Object.keys(filters)?.length === 0) {
      const { books: bookList } = source;

      return of(bookList);
    }

    // wjhen triggered from filterForm
    // filters come with empty keys
    // so stripping them here.
    const updatedFilter: Record<string, any> = 
      Object.keys(filters).reduce((acc: IFilter, key: string) => {
        const value = filters[key as keyof IFilter];
        
        if (value !== undefined && value !== null) {
          acc[key as keyof IFilter] = value as any;
        }

        return acc;
      }, {} as IFilter);

    if (Object.keys(updatedFilter)?.length === 0) {
      const { books: bookList } = source;

      return of(bookList);
    }

    const filteredBooks = source.books.filter((book: IBook) => {
      let isMatch = true;

      if ('name' in updatedFilter) {
        const { name } = updatedFilter;
        const condition = this.caseSensitiveSearch(book.name, name) ||
          this.caseSensitiveSearch(book.author, name);
        
        isMatch = isMatch && condition;
      }

      if ('from' in updatedFilter) {
        const { from } = updatedFilter;
        const fromDt = DateTime.fromJSDate(from);
        const bookDt = DateTime.fromFormat(book.publishedDate, 'dd-MM-yyyy');
        const condition = bookDt >= fromDt;
        
        isMatch = isMatch && condition;
      }

      if ('to' in updatedFilter) {
        const { to } = updatedFilter;
        const toDt = DateTime.fromJSDate(to);
        const bookDt = DateTime.fromFormat(book.publishedDate, 'dd-MM-yyyy');
        const condition = bookDt <= toDt;
        
        isMatch = isMatch && condition;
      }

      if ('priceFrom' in updatedFilter) {
        const { priceFrom } = updatedFilter;

        const condition = book.price >= priceFrom;
        
        isMatch = isMatch && condition;
      }

      if ('priceTo' in updatedFilter) {
        const { priceTo } = updatedFilter;

        const condition = book.price <= priceTo;
        
        isMatch = isMatch && condition;
      }

      if ('available' in updatedFilter) {
        const { available } = updatedFilter;

        const condition = book.available === available;
        
        isMatch = isMatch && condition;
      }

      if ('rating' in updatedFilter) {
        const { rating, ratingBase } = updatedFilter;

        let condition = this.passRatingCheck(rating, ratingBase, book.rating);
        
        isMatch = isMatch && condition;
      }

      return isMatch;
    });

    return of(filteredBooks);
  }

  /**
   * Rating filter.
   */
  private passRatingCheck(
    rating: number, 
    ratingBase: RatingBase, 
    bookRating: number,
  ): boolean {
    switch(ratingBase) {
      case RatingBase.equal:
        return rating === bookRating;

      case RatingBase.leq:
        return bookRating <= rating;

      case RatingBase.less:
        return bookRating < rating;

      case RatingBase.geq:
        return bookRating >= rating;

      case RatingBase.greater:
        return bookRating > rating;
    }
  }

  /**
   * Compares two strings.
   */
  private caseSensitiveSearch(searchValue: string, searchKey: string) {
    searchValue = searchValue.toLocaleLowerCase();
    searchKey = searchKey.toLocaleLowerCase();

    return searchValue === searchKey || 
      searchValue.includes(searchKey);
  }
}
