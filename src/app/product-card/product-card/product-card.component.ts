import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCardService } from '../product-card.service';
import { catchError, Subscription, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ICardInfo } from '../product-card.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProductCardComponent implements OnInit, OnDestroy {
  public cardInfo!: ICardInfo;
  public art!: string;
  public errorLoading: boolean = false;

  private subscriptions!: Subscription;

  constructor(private cardService: ProductCardService, private activeRoute: ActivatedRoute, private router: Router, private dialogService: DialogService) { }

  ngOnInit() {
    this.subscriptions = this.activeRoute.paramMap.subscribe(params => {
      this.art = params.get('art') || '';
    });
    this.getCardInfo();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe;
  }

  public addToShopingBag(): void {
    this.cardService.addToShopingBag(this.art);
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

}
