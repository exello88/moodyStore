import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCardService } from '../product-card.service';

export interface ICardInfo {
  art: string;
  description: string;
  image: string;
  name: string;
  price: number;
  color: string;
}



@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProductCardComponent implements OnInit {
  public cardInfo!: ICardInfo;
  public art!: string;

  constructor(private cardService: ProductCardService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.art = params.get('art') || '';
    });

    this.cardService.getCardInfo().subscribe(data => {
      Object.keys(data).forEach(key => {
        data[key].forEach(card => {
          if (card.art === this.art) this.cardInfo = card;
        });
      });
    });
  }
}
