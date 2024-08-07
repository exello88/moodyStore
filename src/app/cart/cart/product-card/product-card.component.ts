import { Component, Input, OnInit } from '@angular/core';
import { CartComponent } from '../cart.component'
import { Router } from '@angular/router';
import { ICardInfo } from '../cart.service';
import { Card } from 'primeng/card';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {
  @Input() cardInfo !: ICardInfo;

  private lastPrice : number = 0;

  constructor(private cartComponent: CartComponent, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.cartComponent.recalculationTotal(this.cardInfo.price);
    });
  }
  

  public deleteCard(): void {
    const shopingBagJson = localStorage.getItem('shopingBag');
    if (shopingBagJson) {
      let shopingBag = JSON.parse(shopingBagJson);
      shopingBag = shopingBag.filter((item: string) => item !== this.cardInfo.art);
      localStorage.setItem('shopingBag', JSON.stringify(shopingBag));
      this.cartComponent.ngOnInit();
    }
  }

  public navigateToCard(): void {
    this.router.navigate(['/product/' + this.cardInfo.art]);
  }

  public inputValueChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = Number(inputElement.value);
    this.cartComponent.recalculationTotal(inputValue * this.cardInfo.price - this.lastPrice);
    this.lastPrice = inputValue * this.cardInfo.price;
  }
}
