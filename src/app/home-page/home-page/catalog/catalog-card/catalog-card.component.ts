import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CatalogService, IAllCardsObject, ICardInfo } from '../catalog.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../../../app.component';
import { LocalStorageService } from '../../../../local-storage.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments'

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CatalogCardComponent implements OnInit, OnDestroy {
  @Input() public cardInfo!: ICardInfo;
  @Input() public adminStatus!: boolean;
  @Input() public modeStatus!: string;

  public btnWishlistColor!: string;

  private subscription!: Subscription;

  @Output() redrawing: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router, private appComponent: AppComponent, private localStorageService: LocalStorageService, private catalogServise: CatalogService) { }

  ngOnInit() {
    this.adminStatus = this.appComponent.admin;
    
    this.initializingButtonColor();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public navigateToProductCard(): void {
    this.router.navigate(['/product', this.modeStatus, this.cardInfo.art]);
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

  public deleteCard(event: MouseEvent): void {
    event.stopPropagation();
    this.subscription = this.catalogServise.getAllCards(this.modeStatus).subscribe(allCards => {/*  */
      Object.keys(allCards).forEach(key => {
        allCards[key] = allCards[key].filter(card => card.art !== this.cardInfo.art);
      });
      this.catalogServise.deleteCardFromFB(allCards, this.modeStatus, () => {
        this.redrawing.emit();
      })
    });
  }

}
