import { Component, Input, OnInit } from '@angular/core';
import { CardInfo } from '../catalog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.scss']
})
export class CatalogCardComponent {
  @Input() public cardInfo!: CardInfo;

  constructor(private router: Router) { }

  public navigateToProductCard(): void {
    this.router.navigate(['/product', this.cardInfo.art]);
  }

}
