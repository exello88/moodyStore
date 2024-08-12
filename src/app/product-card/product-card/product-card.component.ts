import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCardService } from '../product-card.service';
import { catchError, Subscription, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ICardInfo } from '../product-card.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProductCardComponent implements OnInit, OnDestroy {
  public cardInfo!: ICardInfo;
  public art!: string;
  public errorLoading!: boolean;
  public addedToCart!: boolean;
  public productQuantity: number = 0;

  private subscriptions!: Subscription;

  constructor(private cardService: ProductCardService, private activeRoute: ActivatedRoute, private router: Router, private dialogService: DialogService, private AppComponent: AppComponent) { }

  ngOnInit() {
    this.subscriptions = this.activeRoute.paramMap.subscribe(params => {
      this.art = params.get('art') || '';
    });
    this.initialButton();
    this.getCardInfo();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe;
  }

  public addToShopingBag(): void {
    this.productQuantity = 1;
    this.addedToCart = true;
    this.cardService.addToShopingBag(this.art);
    this.AppComponent.changeCartItemCount();
  }

  public changeProductQuality(changeValue: number) : void {
    this.productQuantity += changeValue;

    if (this.productQuantity !== 0) {
      if (typeof localStorage !== 'undefined') {
        const shopingBagJson = localStorage.getItem('shopingBag');
        if (shopingBagJson) {
          let elementsFromBagArts = JSON.parse(shopingBagJson);
          elementsFromBagArts[this.art] = this.productQuantity;
          localStorage.setItem('shopingBag', JSON.stringify(elementsFromBagArts));
        }
      }
    }
    else
      this.deleteCard();
      this.AppComponent.changeCartItemCount();
  }

  private deleteCard(): void {
    const shopingBagJson = localStorage.getItem('shopingBag');
    if (shopingBagJson) {
      let shopingBag = JSON.parse(shopingBagJson);
      if (shopingBag[this.cardInfo.art]) {
        delete shopingBag[this.cardInfo.art];
      }
      localStorage.setItem('shopingBag', JSON.stringify(shopingBag));
    }
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
      Object.keys(data).forEach(key => {
        data[key].forEach(card => {
          if (card.art === this.art) this.cardInfo = card;
        });
      });
    });
  }

  private initialButton(): void {
    if (typeof localStorage !== 'undefined') {
      const shopingBagJson = localStorage.getItem('shopingBag');
      if (shopingBagJson) {
        let shopingBag = JSON.parse(shopingBagJson);
        if (!shopingBag[this.art])
          this.addedToCart = false;
        else {
          this.addedToCart = true;
          this.productQuantity = shopingBag[this.art];
        }
      }
    }
  }
}
