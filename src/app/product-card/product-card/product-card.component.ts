import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCardService } from '../product-card.service';
import { catchError, Subscription, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ICardInfo } from '../product-card.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { AppComponent } from '../../app.component';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss', './media.scss'] ,
  encapsulation: ViewEncapsulation.None
})
export class ProductCardComponent implements OnInit, OnDestroy {
  public cardInfo!: ICardInfo;
  public art!: string;
  public btnWishlistColor!: string;
  public errorLoading!: boolean;
  public addedToCart!: boolean;
  public productQuantity: number = 0;

  private subscriptions!: Subscription;

  constructor(private cardService: ProductCardService, private activeRoute: ActivatedRoute, private router: Router, private dialogService: DialogService, private AppComponent: AppComponent, private localStorageServise: LocalStorageService) { }

  ngOnInit() {
    this.subscriptions = this.activeRoute.paramMap.subscribe(params => {
      this.art = params.get('art') || '';
    this.initialButton();
    this.getCardInfo();
    this.initializingButtonColor();
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe;
  }

  public addToShopingBag(): void {
    this.productQuantity = 1;
    this.addedToCart = true;
    this.localStorageServise.addToShopingBagProductCard(this.art);
    this.AppComponent.changeCartItemCount();
  }

  public changeProductQuality(changeValue: number): void {
    this.productQuantity += changeValue;

    if (this.productQuantity !== 0) {
      this.localStorageServise.changeProductQualityProductCard(this.art, this.productQuantity)
    }
    else
      this.deleteCard();
    this.AppComponent.changeCartItemCount();
  }

  public initializingButtonColor(): void {
    this.btnWishlistColor = this.localStorageServise.initializingButtonColor(this.art);
  }

  public updateWishlist(): void {
    if (typeof localStorage !== 'undefined') {
      const wishlistJson = localStorage.getItem('wishlist');
      if (wishlistJson) {
        let wishlist = JSON.parse(wishlistJson);
        if (wishlist.includes(this.cardInfo.art)) {
          this.btnWishlistColor = 'black';
          this.localStorageServise.deleteWishlistCard(this.art);
        }
        else {
          wishlist.push(this.cardInfo.art);
          this.btnWishlistColor = 'red';
          localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
        this.AppComponent.changeWishlistItemCount();
      }
    }
  }

  private deleteCard(): void {
    this.localStorageServise.deleteForCartProductCard(this.cardInfo);
    this.addedToCart = false;
  }

  private getCardInfo(): void {
    this.subscriptions = this.cardService.getAllCard().pipe(
      catchError(error => {
        this.errorLoading = true;
        const errorDialog = this.dialogService.open(ErrorMessageComponent, {
          data: {
            errorMessage: 'Unable to retrieve data'
          }
        });
        errorDialog.onClose.subscribe(() => {
          this.router.navigate(['/home']);
        });
        return throwError(() => new Error(error.message));
      })
    ).subscribe(data => {
      data.forEach(card => {
        if (card.art === this.art) this.cardInfo = card;
      });
    });
  }

  private initialButton(): void {
    let buttonInformation = this.localStorageServise.initialProductCardButton(this.art);
    if (buttonInformation) {
      this.addedToCart = buttonInformation.addedToCart;
      this.productQuantity = buttonInformation.productQuantity;
    }
  }
}
