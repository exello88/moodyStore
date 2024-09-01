import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, ICardInfo } from '../cart.service';
import { AppComponent } from '../../../app.component';
import { LocalStorageService } from '../../../local-storage.service';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {
  @Input() cardInfo !: ICardInfo;
  public productQuantity!: number;

  private lastPrice!: number;

  @Output() priceForRecalculating: EventEmitter<number> = new EventEmitter<number>();
  @Output() redrawingCards: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router, private appComponent: AppComponent, private cartService: CartService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.initializationProductQuantity();
  }

  public deleteCard(): void {
    this.localStorageService.deleteForCartProductCard(this.cardInfo);
    this.redrawingCards.emit();
    this.appComponent.changeCartItemCount();
  }

  public navigateToCard(): void {
    this.router.navigate(['/product', this.cardInfo.art]);
  }

  public inputValueChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value === '') return;

    let inputValue = +inputElement.value;
    if (inputValue > 0) {
      this.priceForRecalculating.emit(inputValue * this.cardInfo.price - this.lastPrice);
      this.lastPrice = inputValue * this.cardInfo.price;
      this.localStorageService.changeProductQuantityCart(this.cardInfo.art, inputValue);
    }
    else {
      this.deleteCard();
      this.appComponent.changeCartItemCount();
    }
    this.appComponent.changeCartItemCount();
  }

  private initializationProductQuantity(): void {
    const result = this.localStorageService.initializationProductQuantityCart(this.cardInfo);
    if (result) {
      this.productQuantity = result.productQuantity;
      this.lastPrice = result.lastPrice;
    }
  }
}
