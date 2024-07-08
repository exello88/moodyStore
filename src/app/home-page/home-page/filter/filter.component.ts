import { Component, OnInit } from '@angular/core';
import { FilterService } from './filter.service';
import { Subscription } from 'rxjs';

interface IFilters {
  'newArrivals': string[];
  'shopByRoom': { [room: string]: string[] };
  'shopByConcept': string[];
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

  constructor(private filterService: FilterService) { }

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


  formatCamelCase(key: string): string {
    let normalStr = key.replace(/([A-Z])/g, ' $1').trim().toLowerCase();
    normalStr = normalStr.charAt(0).toUpperCase() + normalStr.slice(1);

    return normalStr;
  }
}
