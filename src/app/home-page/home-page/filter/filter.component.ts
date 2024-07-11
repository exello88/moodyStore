import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FilterService, IFilters } from './filter.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit, OnDestroy {

  public filters!: IFilters;
  private subscription!: Subscription;
  public filterLoaded : boolean = false;
  @Output() public filtersLoadedEvent: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(private filterService: FilterService) { }

  ngOnInit() {
    this.subscription = this.filterService.getFilters().subscribe(data => {
      this.filters = data;
      this.filtersLoadedEvent.emit(true);
      this.filterLoaded = true;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
