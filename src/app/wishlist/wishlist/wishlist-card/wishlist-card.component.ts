import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ICardInfo } from '../../../home-page/home-page/catalog/catalog.service';
import { Router } from '@angular/router';
import { WishlistService } from '../wishlist.service';
import { AppComponent } from '../../../app.component';
import { LocalStorageService } from '../../../local-storage.service';

@Component({
  selector: 'app-wishlist-card',
  templateUrl: './wishlist-card.component.html',
  styleUrl: './wishlist-card.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class WishlistCardComponent implements OnInit {
  @Input() cardInfo !: ICardInfo;

  public addedToCart!: boolean;
  public productQuantity: number = 0;

  @Output() redrawingCards: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router, private wishlistService: WishlistService, private appComponent: AppComponent, private localStorageService : LocalStorageService) { }

  ngOnInit() {
    this.initialButton();
  }

  public navigateToProductCard(): void {
    this.router.navigate(['/product', this.cardInfo.art]);
  }

  public deleteCard(): void {
    this.localStorageService.deleteWishlistCard(this.cardInfo.art);
    this.redrawingCards.emit();
    this.appComponent.changeWishlistItemCount();
  }

  public initialButton(): void {
    let buttonInfo = this.localStorageService.initialWishlistButton(this.cardInfo.art)
    if(buttonInfo){
      this.addedToCart = buttonInfo.addedToCart;
      this.productQuantity = buttonInfo.productQuantity;
    }
  }

  public changeProductQuality(changeValue: number): void {
    this.productQuantity += changeValue;

    if (this.productQuantity !== 0) {
      this.localStorageService.changeProductQualityWishlist(this.cardInfo.art, this.productQuantity)
    }
    else
      this.deleteCardForShopingBag();
    this.appComponent.changeCartItemCount();
  }

  public addToShopingBag(): void {
    this.productQuantity = 1;
    this.addedToCart = true;
    this.localStorageService.addToShopingBagProductCard(this.cardInfo.art);
    this.appComponent.changeCartItemCount();
  }

  private deleteCardForShopingBag(): void {
    this.localStorageService.deleteForCartProductCard(this.cardInfo);
    this.addedToCart = false;
  }
}
