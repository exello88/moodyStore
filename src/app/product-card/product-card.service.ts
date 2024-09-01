import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
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

  public getAllCard(): Observable<ICardInfo[]> {
    return forkJoin([
      this.http.get<IAllCardsObject>(environment.apiFireBase + '/CATALOG/Products.json'),
      this.http.get<IAllCardsObject>(environment.apiFireBase + '/CATALOG/Models.json')
    ]).pipe(
      map(results => {
        const allCards: ICardInfo[] = [];

        
        for (const result of results) {
          for (const key in result) {
            if (result.hasOwnProperty(key)) {
              allCards.push(...result[key]); 
            }
          }
        }
        
        return allCards; 
      })
    );
  }


}
