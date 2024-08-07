import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { catchError, Subscription, throwError } from 'rxjs';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
import { ICardInfo } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit, OnDestroy {
  public elementsFromBag!: ICardInfo[];
  public errorLoading: boolean = false;
  public errorMessage!: string;
  public totalPrice!: number;

  private subscriptions: Subscription = new Subscription();

  constructor(private cartServise: CartService, private router: Router) { }

  ngOnInit() {
    this.elementsFromBag = [];
    this.totalPrice = 0;
    const shopingBagJson = localStorage.getItem('shopingBag');
    if (shopingBagJson) {
      let elementsFromBagArts = JSON.parse(shopingBagJson);
      this.getElementFromBag(elementsFromBagArts);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public getElementFromBag(elementsFromBagArts: string[]): void {
    this.subscriptions = this.cartServise.getAllCard().pipe(
      catchError(error => {
        this.errorLoading = true;
        this.errorMessage = 'Unable to retrieve data';
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
        return throwError(() => new Error(error.message));
      })
    ).subscribe(data => {
      Object.keys(data).forEach(key => {
        elementsFromBagArts.forEach(art => {
          
          data[key].forEach(card => {
            if (card.art === art) {
              this.elementsFromBag.push(card);
            }
          });
        });
      });
    });
  }

  public recalculationTotal(value : number) : void{
    this.totalPrice = this.totalPrice + value;
    this.totalPrice = +this.totalPrice.toFixed(2);
  }
}
