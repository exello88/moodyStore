import { Component, OnDestroy, OnInit, viewChild, ViewEncapsulation } from '@angular/core';
import { ICardInfo } from '../product-card/product-card.service';
import { Subscription } from 'rxjs';
import { SearchService } from './search.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss', './media.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SearchComponent implements OnInit, OnDestroy {
  public products!: ICardInfo[];

  private subscribe!: Subscription;

  constructor(private searchServise: SearchService, private router: Router, private appComponent : AppComponent) { }

  ngOnInit() {
    this.subscribe = this.searchServise.getAllCards().subscribe(allCards => {
      this.products = allCards;
    });
  }

  ngOnDestroy() {
    if (this.subscribe)
      this.subscribe.unsubscribe()
  }

  public navigateToCard(cardInfo : ICardInfo) : void{
    this.appComponent.searchStatus = false;
    this.router.navigate(['/product', cardInfo.art]);
  }
}
