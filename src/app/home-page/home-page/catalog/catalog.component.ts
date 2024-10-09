import { Component, DoCheck, EventEmitter, Input, OnDestroy, Output, SimpleChanges, viewChild, ViewEncapsulation } from '@angular/core';
import { ICardInfo, CatalogService } from './catalog.service';
import { Subscription } from 'rxjs';
import { PaginatorState } from 'primeng/paginator';
import { AppComponent } from '../../../app.component';
import { ModeStatus } from './catalog.enum';

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
  styleUrls: ['./catalog.component.scss', './media.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CatalogComponent implements DoCheck, OnDestroy {
  @Input() selectedItems!: ISelectedItems;
  @Input() filterStatus: boolean = false;
  @Input() modeStatus: string = ModeStatus.modeStatus;

  public ObjectForDrawing: ICardInfo[] = [];
  public PaginationObjectForDrawing: ICardInfo[] = [];
  public lastModeStatus: string = ModeStatus.lastModeStatus;
  public catalogStatus: boolean = false;
  
  public paginationModeStatus!: boolean;
  public adminStatus: boolean = true;
  public firstInPagination: number = 0;
  public lastInPagination: number = 0;
  private lustSelectedItems!: ISelectedItems;
  private subscription!: Subscription;

  @Output() filterStatusEvent: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() catalogStatusEvent: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(private catalogServise: CatalogService, private appComponent: AppComponent) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngDoCheck() {
    if (JSON.stringify(this.selectedItems) !== JSON.stringify(this.lustSelectedItems)) {
      this.preparingElementsForDrawing();
    }

    if (this.modeStatus !== this.lastModeStatus) {
      this.paginationModeStatus = false;
      this.ObjectForDrawing = [];
      this.PaginationObjectForDrawing = [];
      this.catalogStatus = false;
      this.lastModeStatus = this.modeStatus;
      if (this.selectedItems.typeProduct.length === 0) {
        this.subscription = this.catalogServise.getAllCards(this.modeStatus).subscribe(allCards => {
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
      else
        this.subscription = this.catalogServise.getCardForDrawing(this.selectedItems.typeProduct, this.modeStatus).subscribe(data => {
          this.ObjectForDrawing = data;
        });
    }
  }

  public paginatorPageChange(event: PaginatorState) {
    if (event.first !== undefined)
      this.firstInPagination = event.first;
    this.lastInPagination = this.firstInPagination + 9;
    this.ObjectForDrawing = this.PaginationObjectForDrawing.slice(this.firstInPagination, this.lastInPagination);
  }

  public preparingElementsForDrawing(): void {
    this.ObjectForDrawing = [];
    this.PaginationObjectForDrawing = [];
    this.catalogStatus = false;
    this.paginationModeStatus = false;
    this.lustSelectedItems = JSON.parse(JSON.stringify(this.selectedItems));
    if (this.selectedItems.typeProduct.length === 0) {
      this.subscription = this.catalogServise.getAllCards(this.modeStatus).subscribe(allCards => {
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

  private checkPagination(): void {
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

