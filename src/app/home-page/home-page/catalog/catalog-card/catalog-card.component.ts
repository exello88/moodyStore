import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ICardInfo } from '../catalog.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../../../app.component';
import { LocalStorageService } from '../../../../local-storage.service';

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CatalogCardComponent implements OnInit {
  @Input() public cardInfo!: ICardInfo;

  public btnWishlistColor!: string;

  constructor(private router: Router, private appComponent: AppComponent, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.initializingButtonColor();
  }

  public navigateToProductCard(): void {
    this.router.navigate(['/product', this.cardInfo.art]);
  }

  public initializingButtonColor(): void {
    this.btnWishlistColor = this.localStorageService.initializingButtonColor(this.cardInfo.art);
  }

  public updateWishlist(event: MouseEvent): void {
    event.stopPropagation();
    if (typeof localStorage !== 'undefined') {
      const wishlistJson = localStorage.getItem('wishlist');
      if (wishlistJson) {
        let wishlist = JSON.parse(wishlistJson);
        if (wishlist.includes(this.cardInfo.art)) {
          this.btnWishlistColor = 'black';
          this.localStorageService.deleteWishlistCard(this.cardInfo.art);
        }
        else {
          wishlist.push(this.cardInfo.art);
          this.btnWishlistColor = 'red';
          localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
        this.appComponent.changeWishlistItemCount();
      } else {
        let wishlist = [];
        wishlist.push(this.cardInfo.art);
        this.btnWishlistColor = 'red';
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
      }
    }
  }
}
