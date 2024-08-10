import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ICardInfo } from '../cart.service';
import { AppComponent } from '../../../app.component';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {
  @Input() cardInfo !: ICardInfo;

  private lastPrice!: number;

  @Output() priceForRecalculating: EventEmitter<number> = new EventEmitter<number>();
  @Output() redrawingCards: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router, private appComponent : AppComponent) { }

  ngOnInit() {
    this.lastPrice = this.cardInfo.price;
  }

  public deleteCard(): void {
    const shopingBagJson = localStorage.getItem('shopingBag');
    if (shopingBagJson) {
      let shopingBag = JSON.parse(shopingBagJson);
      shopingBag = shopingBag.filter((item: string) => item !== this.cardInfo.art);
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
    let inputValue = +inputElement.value;
    this.priceForRecalculating.emit(inputValue * this.cardInfo.price - this.lastPrice);
    this.lastPrice = inputValue * this.cardInfo.price;
  }
}
