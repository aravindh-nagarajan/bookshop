import {
  Component, 
  OnInit,
} from '@angular/core';

import {
  FormControl,
  FormGroup,
} from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import {
  clearFilters, 
  updateFilters,
} from '../../store/actions/dashboard.actions';

import { AppState } from '../../store/reducers';
import { RatingBase } from '../../types/books.type';

/**
 * @description Component to apply filters on book list.
 * 
 * @author Aravindh Nagarajan
 */
@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.less']
})
export class FiltersComponent implements OnInit {
  /**
   * filterForm formgroup instance.
   */
  public readonly filterForm: FormGroup;

  /**
   * RatingBase enum.
   */
  public readonly ratingBase = RatingBase;

  /**
   * Subscription to patch formgroup with store.
   */
  private patchSubscription: Subscription | undefined;

  /**
   * Subscription to trigger filter event on form update.
   */
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

  /**
   * Create subscriptions to maintain filterform.
   */
  public ngOnInit(): void {
    this.patchSubscription = this.store.select(state => state.dashboard.filters).subscribe(val => { console.log(val)
      this.filterForm.patchValue(val);
    });

    this.filterUpdateSubscription = this.filterForm.valueChanges
      .subscribe(value => {
        this.store.dispatch(updateFilters({ value }));
      });
  }

  /**
   * Unscribes subscriptions.
   */
  public ngDestroy(): void {
    if (this.filterUpdateSubscription) {
      this.filterUpdateSubscription.unsubscribe();
    }

    if (this.patchSubscription) {
      this.patchSubscription.unsubscribe();
    }
  }

  /**
   * Resets filters.
   */
  public clearFilters(): void {
    this.store.dispatch(clearFilters());

    this.filterForm.reset({
      ratingBase: RatingBase.equal,
    });
  }
}
