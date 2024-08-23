import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { IAllCardsObject, ICardInfo } from '../../home-page/home-page/catalog/catalog.service';
import { catchError, Subscription, throwError } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { WishlistService } from './wishlist.service';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { LocalStorageService } from '../../local-storage.service';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class WishlistComponent implements OnInit, OnDestroy {
  public PaginationObjectForDrawing!: ICardInfo[];
  public ObjectForDrawing: ICardInfo[] = [];
  public errorLoading: boolean = false;
  public paginationModeStatus: boolean = false;
  public firstInPagination: number = 0;
  public lastInPagination: number = 0;

  private subscriptions: Subscription = new Subscription();

  constructor(private wishlistServise: WishlistService, private dialogService: DialogService, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.drawingCart();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public getElementFromBag(elementsFromBagArts: string[]): void {
    this.subscriptions = this.wishlistServise.getAllCards().pipe(
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
    ).subscribe((data: IAllCardsObject) => {
      this.filterProductCards(data, elementsFromBagArts);
      this.checkPagination();
    });
  }


  public drawingCart(): void {
    this.paginationModeStatus = false;
    this.ObjectForDrawing = [];
    let allCardFromWishlist = this.localStorageService.getWishlistCartItemsFromLocalStorage();
    if (allCardFromWishlist)
      this.getElementFromBag(allCardFromWishlist);
  }

  public paginatorPageChange(event: PaginatorState) : void {
    if (event.first !== undefined)
      this.firstInPagination = event.first;
    this.lastInPagination = this.firstInPagination + 9;
    this.ObjectForDrawing = this.PaginationObjectForDrawing.slice(this.firstInPagination, this.lastInPagination);
  }

  private filterProductCards(allCards: IAllCardsObject, elementsFromBagArts: string[]): void {
    Object.keys(allCards).forEach(key => {
      elementsFromBagArts.forEach(art => {
        allCards[key].forEach(card => {
          if (card.art === art) {
            this.ObjectForDrawing.push(card);
          }
        });
      });
    });
  }

  private checkPagination() : void {
    this.paginationModeStatus = false;
    if (this.ObjectForDrawing.length >= 10) {
      this.PaginationObjectForDrawing = this.ObjectForDrawing;
      this.ObjectForDrawing = this.PaginationObjectForDrawing.slice(0, 9);
      this.paginationModeStatus = true;
    }
    else
      this.paginationModeStatus = false;
  }
}
