import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  constructor(private http : HttpClient) { }

  public getCardInfo(): Observable<IAllCardsObject> {
    return this.http.get<IAllCardsObject>('https://moodystore2-15929-default-rtdb.firebaseio.com/CATALOG/Products.json');
  }
}
