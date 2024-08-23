import { Component, DoCheck, EventEmitter, Input, OnDestroy, Output, SimpleChanges, viewChild, ViewEncapsulation } from '@angular/core';
import { ICardInfo, CatalogService } from './catalog.service';
import { Subscription } from 'rxjs';
import { PaginatorState } from 'primeng/paginator';

export interface ISelectedItems {
  typeProduct: string[];
  price: {
    [key: number]: {
      'min': number;
      'max': number;
    };
  };
  Color: string[];
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CatalogComponent implements DoCheck, OnDestroy {
  @Input() selectedItems!: ISelectedItems;

  public ObjectForDrawing: ICardInfo[] = [];
  public PaginationObjectForDrawing: ICardInfo[] = [];
  public modeStatus: string = 'Products';
  public lastModeStatus: string = 'Products';
  public filterStatus: boolean = false;
  public catalogStatus: boolean = false;
  public paginationModeStatus!: boolean;
  public firstInPagination: number = 0;
  public lastInPagination: number = 0;

  private lustSelectedItems!: ISelectedItems;
  private subscription!: Subscription;

  @Output() filterStatusEvent: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() catalogStatusEvent: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(private catalogServise: CatalogService) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngDoCheck() {
    if (JSON.stringify(this.selectedItems) !== JSON.stringify(this.lustSelectedItems)) {
      this.paginationModeStatus = false;
      this.preparingElementsForDrawing();
    }

    if (this.modeStatus !== this.lastModeStatus) {
      this.lastModeStatus = this.modeStatus;
      this.subscription = this.catalogServise.getCardForDrawing(this.selectedItems.typeProduct, this.modeStatus).subscribe(data => {
        this.ObjectForDrawing = data;
      });
    }
  }

  public changeFilterStatus(): void {
    this.filterStatus = !this.filterStatus;
    this.filterStatusEvent.emit(this.filterStatus);
  }

  public changeModeStatus(mode: string): void {
    this.modeStatus = mode;
  }

  public paginatorPageChange(event: PaginatorState) {
    if (event.first !== undefined)
      this.firstInPagination = event.first;
    this.lastInPagination = this.firstInPagination + 9;
    this.ObjectForDrawing = this.PaginationObjectForDrawing.slice(this.firstInPagination, this.lastInPagination);
  }

  private preparingElementsForDrawing(): void {
    this.ObjectForDrawing = [];
    this.PaginationObjectForDrawing = [];
    this.catalogStatus = false;
    this.lustSelectedItems = JSON.parse(JSON.stringify(this.selectedItems));
    if (this.selectedItems.typeProduct.length === 0) {
      this.subscription = this.catalogServise.getAllCards().subscribe(allCards => {
        Object.keys(allCards).forEach(key => {
          allCards[key].forEach(card => {
            this.ObjectForDrawing.push(card);
          });
        });
        this.ObjectForDrawing = this.catalogServise.filterCards(this.ObjectForDrawing, this.selectedItems);
        this.catalogStatus = true;
        this.checkPagination();
      });
    }
    else {
      this.subscription = this.catalogServise.getCardForDrawing(this.selectedItems.typeProduct, this.modeStatus).subscribe(allCards => {
        this.ObjectForDrawing = this.catalogServise.filterCards(allCards, this.selectedItems);
        this.catalogStatus = true;
        this.checkPagination();
      });
    }
  }

  private checkPagination() {
    this.paginationModeStatus = false;
    if (this.ObjectForDrawing.length >= 10) {
      this.PaginationObjectForDrawing = this.ObjectForDrawing;
      this.ObjectForDrawing = this.PaginationObjectForDrawing.slice(0, 9);
      this.paginationModeStatus = true;
    }
    else
      this.paginationModeStatus = false;
  }
}

