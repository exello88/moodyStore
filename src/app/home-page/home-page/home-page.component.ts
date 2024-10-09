import { Component, EventEmitter, Output } from '@angular/core';
import { ModeStatus } from './catalog/catalog.enum';
import { CatalogComponent } from './catalog/catalog.component';

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
  styleUrls: ['./home-page.component.scss', './media.scss']
})
export class HomePageComponent {
  public modeStatus: string = ModeStatus.modeStatus;
  public selectedItems: ISelectedItems = {
    typeProduct: [],
    price: {},
    Color: []
  };
  public selectedItemsColor: string[] = [];
  public filterIsLoad: boolean = true;
  public catalogIsLoad: boolean = true;
  public filterStatus: boolean = false;
  public catalogStatus: boolean = false;

  public changeFilterStatus(): void {
    this.filterStatus = !this.filterStatus;
  }

  public changeModeStatus(mode: string): void {
    this.modeStatus = mode;
  }

  public filtersLoaded(loaded: boolean): void {
    this.filterIsLoad = loaded;
  }

  public filterStatusChange(status: boolean): void {
    this.filterStatus = status;
  }

  public selectedItemsChange(items: ISelectedItems): void {
    this.selectedItems = items;
  }

  public catalogStatusChange(status: boolean) : void {
    this.catalogIsLoad = status;
  }

  public test() : void{
    this.filterStatus = false;
  }
}
