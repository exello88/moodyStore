import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, ICardInfo } from '../cart.service';
import { AppComponent } from '../../../app.component';


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

  constructor(private router: Router, private appComponent: AppComponent, private cartService: CartService) { }

  ngOnInit() {
    this.initializationProductQuantity();
  }

  public deleteCard(): void {
    const shopingBagJson = localStorage.getItem('shopingBag');
    if (shopingBagJson) {
      let shopingBag = JSON.parse(shopingBagJson);
      if (shopingBag[this.cardInfo.art]) {
        delete shopingBag[this.cardInfo.art];
      }
      localStorage.setItem('shopingBag', JSON.stringify(shopingBag));
      this.redrawingCards.emit();
      this.appComponent.changeCartItemCount();
    }
  }

  public navigateToCard(): void {
    this.router.navigate(['/product/' + this.cardInfo.art]);
  }

  public inputValueChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value === '') return;

    let inputValue = +inputElement.value;
    if (inputValue > 0) {
      this.priceForRecalculating.emit(inputValue * this.cardInfo.price - this.lastPrice);
      this.lastPrice = inputValue * this.cardInfo.price;
      this.cartService.changeProductQuantity(this.cardInfo.art, inputValue);
    }
    else {
      this.deleteCard();
      this.appComponent.changeCartItemCount();
    }
    this.appComponent.changeCartItemCount();
  }

  private initializationProductQuantity(): void {
    if (typeof localStorage !== 'undefined') {
      const shopingBagJson = localStorage.getItem('shopingBag');
      if (shopingBagJson) {
        let shopingBag = JSON.parse(shopingBagJson);
        if (shopingBag[this.cardInfo.art]) {
          this.productQuantity = shopingBag[this.cardInfo.art];
          this.lastPrice = this.productQuantity * this.cardInfo.price;
        }
      }
    }

  }
}
