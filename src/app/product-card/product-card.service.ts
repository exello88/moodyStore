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
      let shopingBag: { [key: string]: number } = JSON.parse(shopingBagJson);
      shopingBag[art] = 1;
      localStorage.setItem('shopingBag', JSON.stringify(shopingBag));
    } else {
      let shopingBag: { [key: string]: number } = {};
      shopingBag[art] = 1;
      localStorage.setItem('shopingBag', JSON.stringify(shopingBag));
    }
  }

}
