import { Component } from '@angular/core';
import { FilterService, IFilters } from './filter.service';
import { Subscription } from 'rxjs';


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

  public getPriceRanges(): { min: number; max: number }[] {
    return this.filterService.getPriceRanges(this.filters);
  }


  public formatCamelCase(key: string): string {
    return this.filterService.getNormalFormatStr(key);
  }
}
