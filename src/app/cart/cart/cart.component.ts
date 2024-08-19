import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { catchError, Subscription, throwError } from 'rxjs';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
import { ICardInfo, IAllCardsObject } from './cart.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ErrorMessageComponent } from './error-message/error-message.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit, OnDestroy {
  public elementsFromBag!: ICardInfo[];
  public errorLoading: boolean = false;
  public totalPrice!: number;

  private subscriptions: Subscription = new Subscription();

  constructor(private cartServise: CartService, private dialogService: DialogService, private router: Router) { }

  ngOnInit() {
    this.drawingCart();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public getElementFromBag(elementsFromBagArts: { [key: string]: number }): void {
    this.subscriptions = this.cartServise.getAllCards().pipe(
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
      this.filterProductCards(data, elementsFromBagArts);
    });
  }


  public recalculationTotal(value: number): void {
    this.totalPrice = this.totalPrice + value;
    this.totalPrice = +this.totalPrice.toFixed(2);
  }

  public drawingCart(): void {
    this.elementsFromBag = [];
    this.totalPrice = 0;
    this.getCartItemsFromLocalStorage();
  }

  private getCartItemsFromLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const shopingBagJson = localStorage.getItem('shopingBag');
      if (shopingBagJson) {
        let elementsFromBagArts = JSON.parse(shopingBagJson);
        this.getElementFromBag(elementsFromBagArts);
      }
    }
  }

  private filterProductCards(allCards: IAllCardsObject, elementsFromBagArts: { [key: string]: number }): void {
    Object.keys(allCards).forEach(key => {
      Object.keys(elementsFromBagArts).forEach(art => {
        allCards[key].forEach(card => {
          if (card.art === art) {
            this.elementsFromBag.push(card);
            this.totalPrice = this.totalPrice + elementsFromBagArts[card.art] * card.price;
          }
        });
      });
    });
    this.totalPrice = +this.totalPrice.toFixed(2);
  }
}
