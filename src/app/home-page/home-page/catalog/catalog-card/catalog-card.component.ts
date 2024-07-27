import { Component, Input, OnInit } from '@angular/core';
import { CardInfo, CatalogService } from '../catalog.service';

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.scss']
})
export class CatalogCardComponent implements OnInit {
  @Input() public cardInfo!: CardInfo;

  public imageUrl!: string;

  constructor(private catalogService: CatalogService) { }

  ngOnInit() {
    if(this.cardInfo.image[0]){
      this.imageUrl = this.cardInfo.image[0];
    }
  }
}
