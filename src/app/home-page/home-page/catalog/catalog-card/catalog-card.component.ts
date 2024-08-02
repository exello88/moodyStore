import { Component, Input, OnInit } from '@angular/core';
import { CardInfo } from '../catalog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.scss']
})
export class CatalogCardComponent implements OnInit {
  @Input() public cardInfo!: CardInfo;

  public imageUrl!: string;

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.cardInfo.image[0]) {
      this.imageUrl = this.cardInfo.image[0];
    }
  }

  public navigateToProductCard(): void {
    this.router.navigate(['/product', this.cardInfo.art]);
  }

}
