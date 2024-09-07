import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { IAllCardsObject, ICardInfo } from '../../home-page/home-page/catalog/catalog.service';
import { environment } from '../../environments';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor(private http: HttpClient) { }

  public getAllCards(): Observable<ICardInfo[]> {
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