import { Component, DoCheck, EventEmitter, Input, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { CardInfo, CatalogService } from './catalog.service';
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
  public ObjectForDrawing!: CardInfo[];
  @Input() selectedItems!: ISelectedItems;
  private lustSelectedItems!: ISelectedItems;
  public modeStatus: string = 'Models';
  public lastModeStatus: string = 'Models';
  public catalogStatus: boolean = false;
  @Output() filterStatusEvent: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  private subscription!: Subscription;
  @Output() catalogStatusEvent: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(private catalogServise: CatalogService) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngDoCheck() {
    if (JSON.stringify(this.selectedItems) !== JSON.stringify(this.lustSelectedItems)) {
      this.lustSelectedItems = JSON.parse(JSON.stringify(this.selectedItems));
      if (this.selectedItems.typeProduct.length === 0) this.selectedItems.typeProduct = ['newArrivals', 'bedroom', 'outdoor', 'bathroom', 'livingRoom', 'childRoom', 'conscious']
      this.subscription = this.catalogServise.getCardForDrawing(this.selectedItems.typeProduct, this.modeStatus).subscribe(allCards => {
        this.ObjectForDrawing = this.catalogServise.filterCards(allCards, this.selectedItems);
        this.catalogStatusEvent.emit(true);
      });
    }

    if (this.modeStatus !== this.lastModeStatus) {
      this.lastModeStatus = this.modeStatus;
      this.subscription = this.catalogServise.getCardForDrawing(this.selectedItems.typeProduct, this.modeStatus).subscribe(data => {
        this.ObjectForDrawing = data;
      });
    }
  }

  public changeFilterStatus(): void {
    this.catalogStatus = !this.catalogStatus;
    this.filterStatusEvent.emit(this.catalogStatus);
  }

  public changeModeStatus(mode: string): void {
    this.modeStatus = mode;
  }
}
