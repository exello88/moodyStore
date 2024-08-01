import { Component, EventEmitter, Output } from '@angular/core';

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
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  public selectedItems: ISelectedItems = {
    typeProduct: [],
    price: {},
    Color: []
  };
  public selectedItemsColor: string[] = [];
  public filterIsLoad: boolean = true;
  public catalogIsLoad: boolean = true;
  public filterStatus: boolean = false;



  public filtersLoaded(loaded: boolean): void {
    this.filterIsLoad = loaded;
  }

  public filterStatusChange(status: boolean): void {
    this.filterStatus = status;
  }

  public selectedItemsChange(items: ISelectedItems): void {
    this.selectedItems = items;
  }

  public catalogStatusChange(status: boolean) {
    this.catalogIsLoad = status;
  }
}
