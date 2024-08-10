import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments';

export interface ICardInfo {
  art: string;
  description: string;
  image: string;
  name: string;
  price: number;
  color: string;
}
interface IAllCardsObject {
  [key: string]: ICardInfo[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductCardService {
  constructor(private http: HttpClient) { }

  public getAllCard(): Observable<IAllCardsObject> {
    return this.http.get<IAllCardsObject>(environment.apiFireBase + '/CATALOG/Products.json');
  }

  public addToShopingBag(art: string): void {
    const shopingBagJson = localStorage.getItem('shopingBag');
    if (shopingBagJson) {
      let shopingBag = JSON.parse(shopingBagJson);
      if (!shopingBag.includes(art)) {
        shopingBag.push(art);
      }
      else {
        shopingBag = shopingBag.filter((item: string) => item !== art);
      }
      localStorage.setItem('shopingBag', JSON.stringify(shopingBag));
    }
    else
      localStorage.setItem('shopingBag', JSON.stringify([art]));
  }
}
