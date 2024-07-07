import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterService } from './filter.service';
import { Subscription } from 'rxjs';

interface IFilters {
  'New Arrivals': string[];
  'Shop By Room': { [room: string]: string[] };
  'shop by concept': string[];
  'Gender': string[];
  'Color': string[];
  'Price': {
    [key: number]: {
      'min': number;
      'max': number;
    };
  };
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

  public filters!: IFilters;
  private subscription!: Subscription;

  constructor(public filterService: FilterService) { }

  ngOnInit() {
    this.subscription = this.filterService.getFilters().subscribe(data => {
      this.filters = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getPriceRanges(): { min: number; max: number }[] {
    let price = Object.keys(this.filters.Price).map(key => ({
      min: this.filters.Price[+key].min,
      max: this.filters.Price[+key].max
    }));
    return price;
  }
}
