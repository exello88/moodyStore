import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FilterService, IFilters } from './filter.service';
import { Subscription } from 'rxjs';
import { TreeNode } from 'primeng/api';

export interface ISelectedItems {
  typeProduct: string[],
  price: {
    [key: number]: {
      'min': number;
      'max': number;
    };
  };
  Color: string[],
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit, OnDestroy {
  public treeMenuItems!: TreeNode[];
  @Input() public selectedItems!: ISelectedItems;
  @Output() selectedItemsEvent: EventEmitter<ISelectedItems> = new EventEmitter<ISelectedItems>();
  public filters!: IFilters;
  private subscription!: Subscription;
  public filterLoaded: boolean = false;
  @Output() filtersLoadedEvent: EventEmitter<boolean> = new EventEmitter<boolean>(false);



  constructor(private filterService: FilterService) { }


  ngOnInit() {
    this.subscription = this.filterService.getFilters().subscribe(data => {
      this.filters = data;
      this.treeMenuItems = this.filterService.getItemForMegaMenu(this.filters);
      this.filtersLoadedEvent.emit(true);
      this.filterLoaded = true;
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public filterSearch(item: string): void {
    this.selectedItems.typeProduct = this.filterService.filterItemsChange(this.selectedItems.typeProduct, item);
    this.selectedItemsEvent.emit(this.selectedItems);
    this.filterLoaded = true;
  }

  public filterColorSearch(color: string): void {
    this.selectedItems.Color = this.filterService.filterItemsChange(this.selectedItems.Color, color);
    this.selectedItemsEvent.emit(this.selectedItems);
  }

  public filterPriceSearch(min: number, max: number): void {
    this.selectedItems.price = this.filterService.filterItemsPriceChange(this.selectedItems.price, min, max);
    this.selectedItemsEvent.emit(this.selectedItems);
  }

  private extractLabels(selectedItem: any) {
    console.log(selectedItem);
    if (selectedItem.label && !this.selectedItems.typeProduct.includes(selectedItem.label)) {
      this.selectedItems.typeProduct.push(selectedItem.label);
    }
    if (selectedItem.children && Array.isArray(selectedItem.children)) {
      selectedItem.children.forEach((child: any) => this.extractLabels(child));
    }
  }

  public selectionChange(selectedItem: any) {

    this.selectedItems = {
      typeProduct: [],
      price: {},
      Color: []
    };
    selectedItem.forEach((item: any) => this.extractLabels(item));
    this.selectedItemsEvent.emit(this.selectedItems);
  }
}
