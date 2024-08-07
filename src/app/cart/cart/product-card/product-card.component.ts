import { Component, Input } from '@angular/core';
import { CartComponent } from '../cart.component'
import { Router } from '@angular/router';
import { ICardInfo } from '../cart.service';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() cardInfo !: ICardInfo;

  constructor(private cartComponent: CartComponent, private router: Router) { }

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
}
