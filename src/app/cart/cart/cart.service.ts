import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments';

export interface ICardInfo {
  art: string;
  description: string;
  image: string;
  name: string;
  price: number;
  color: string;
}
export interface IAllCardsObject {
  [key: string]: ICardInfo[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  public getAllCards(): Observable<IAllCardsObject> { 
    return this.http.get<IAllCardsObject>(environment.apiFireBase + '/CATALOG/Products.json');
  }

  public changeProductQuantity(art : string, quantity : number) : void{
    if (typeof localStorage !== 'undefined') {
      const shopingBagJson = localStorage.getItem('shopingBag');
      if (shopingBagJson) {
        let elementsFromBagArts = JSON.parse(shopingBagJson);
        elementsFromBagArts[art] = quantity;
        localStorage.setItem('shopingBag', JSON.stringify(elementsFromBagArts)); 
      } else {
        let shopingBag: { [key: string]: number } = {};
        shopingBag[art] = 1;
        localStorage.setItem('shopingBag', JSON.stringify(shopingBag));
      }
    }
  }
}
