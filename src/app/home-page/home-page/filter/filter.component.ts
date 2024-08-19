import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
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
  styleUrl: './filter.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FilterComponent implements OnInit, OnDestroy {
  @Input() selectedItems!: ISelectedItems;

  public treeMenuItems!: TreeNode[];
  public filters!: IFilters;
  public filterLoaded: boolean = false;

  private subscription!: Subscription;

  @Output() selectedItemsEvent: EventEmitter<ISelectedItems> = new EventEmitter<ISelectedItems>();
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

  public selectionChange(selectedItem: TreeNode | TreeNode[] | null) {
      this.selectedItems.typeProduct.splice(0, this.selectedItems.typeProduct.length);
  
      if (Array.isArray(selectedItem)) {
        selectedItem.forEach((item: TreeNode) => this.extractLabels(item));
      } else if (selectedItem) {
        this.extractLabels(selectedItem);
      }
  
      this.selectedItemsEvent.emit(this.selectedItems);
  }

  private extractLabels(selectedItem: TreeNode) {
    if (selectedItem.label && !this.selectedItems.typeProduct.includes(selectedItem.label)) {
      this.selectedItems.typeProduct.push(selectedItem.label);
    }
    if (selectedItem.children && Array.isArray(selectedItem.children)) {
      selectedItem.children.forEach((child: TreeNode) => this.extractLabels(child));
    }
  }

}
