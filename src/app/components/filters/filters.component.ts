import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { clearFilters, updateFilters } from '../../store/actions/book.actions';
import { AppState } from '../../store/reducers';
import { RatingBase } from '../../types/books.type';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.less']
})
export class FiltersComponent implements OnInit {
  public filterForm: FormGroup;

  public ratingBase = RatingBase;

  private patchSubscription: Subscription | undefined;
  private filterUpdateSubscription: Subscription | undefined;

  constructor(private readonly store: Store<AppState>) {
    this.filterForm = new FormGroup({
      name: new FormControl(null),
      from: new FormControl(null),
      to: new FormControl(null),
      priceFrom: new FormControl(null),
      priceTo: new FormControl(null),
      rating: new FormControl(null),
      ratingBase: new FormControl(null),
      available: new FormControl(null),
    });
   }

  ngOnInit(): void {
    this.patchSubscription = this.store.select(state => state.books.filters).subscribe(val => { console.log(val)
      this.filterForm.patchValue(val);
    });

    this.filterUpdateSubscription = this.filterForm.valueChanges
      .subscribe(value => {
        this.store.dispatch(updateFilters({ value }));
      });
  }

  public ngDestroy() {
    if (this.filterUpdateSubscription) {
      this.filterUpdateSubscription.unsubscribe();
    }

    if (this.patchSubscription) {
      this.patchSubscription.unsubscribe();
    }
  }

  clearFilters() {
    this.store.dispatch(clearFilters());
    this.filterForm.reset({
      ratingBase: RatingBase.equal,
    });
  }
}
