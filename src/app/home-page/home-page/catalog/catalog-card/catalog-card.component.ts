import { Component, Input } from '@angular/core';
import { CardInfo, CatalogService } from '../catalog.service';


@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrl: './catalog-card.component.scss'
})
export class CatalogCardComponent {
  @Input() public cardInfo !: CardInfo;

  constructor(private catalogServise: CatalogService) { }

}
