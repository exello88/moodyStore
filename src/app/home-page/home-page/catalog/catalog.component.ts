import { Component, DoCheck, EventEmitter, Input, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { ICardInfo, CatalogService } from './catalog.service';
import { Subscription } from 'rxjs';

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
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements DoCheck, OnDestroy {
  @Input() selectedItems!: ISelectedItems;

  public ObjectForDrawing: ICardInfo[] = [];
  public modeStatus: string = 'Products';
  public lastModeStatus: string = 'Products';
  public filterStatus: boolean = false;
  public catalogStatus: boolean = false;

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

  private preparingElementsForDrawing():void{
    this.catalogStatus = false;
    this.lustSelectedItems = JSON.parse(JSON.stringify(this.selectedItems));
    if (this.selectedItems.typeProduct.length === 0) {
      this.subscription = this.catalogServise.getAllCards().subscribe(allCards => {
        Object.keys(allCards).forEach(key => {
          allCards[key].forEach(card => {
            this.ObjectForDrawing.push(card);
          });
        });
        this.catalogStatus = true;
      });
    }
    else {
      this.subscription = this.catalogServise.getCardForDrawing(this.selectedItems.typeProduct, this.modeStatus).subscribe(allCards => {
        this.ObjectForDrawing = this.catalogServise.filterCards(allCards, this.selectedItems);
        this.catalogStatus = true;
      });
    }
  }
}
