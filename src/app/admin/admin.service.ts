import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { environment } from '../environments';
import { IAllCardsObject, ICardInfo } from '../home-page/home-page/catalog/catalog.service';

export interface ICardsInfo {
  art: string;
  description: string;
  image: string[];
  name: string;
  price: number;
  color: string;
}

export interface IFilters {
  'newArrivals': string[];
  'shopByRoom': { [room: string]: string[] };
  'shopByConcept': string[];
  'Gender': string[];
  'Color': string[];
  'Price': {
    [key: number]: {
      'min': number;
      'max': number;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class AdminService implements OnDestroy {
  private subscribtions !: Subscription;

  ngOnDestroy() {
    if (this.subscribtions)
      this.subscribtions.unsubscribe();
  }

  constructor(private http: HttpClient) { }

  public getFilters(): Observable<IFilters> {
    return this.http.get<IFilters>(environment.apiFireBase + '/FILTERS.json')
      .pipe(
        map(data => {
          data.shopByRoom = this.getNormalFormatCase(data);
          return data;
        })
      );
  }

  public convertToCamelCase(input: string): string {
    const words = input.split('\n');

    const camelCaseWords = words.map((word) => {
      const trimmedWord = word.trim();
      const firstLetter = trimmedWord.charAt(0).toLowerCase();
      const restOfWord = trimmedWord.slice(1).replace(/\s+(\w)/g, (match, char) => char.toUpperCase());
      return firstLetter + restOfWord;
    });

    return camelCaseWords.join('');
  }

  public addCardToFB(selectedMode: string, selectedCategory: string, newCard: ICardsInfo): void {
    this.subscribtions = this.http.get<ICardInfo[]>(`${environment.apiFireBase}/CATALOG/${selectedMode}/${selectedCategory}.json`).pipe(
      switchMap((lustCards) => {
        const newCards = lustCards ? [...lustCards, newCard] : [newCard];
        return this.http.put(`${environment.apiFireBase}/CATALOG/${selectedMode}/${selectedCategory}.json`, newCards, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      })
    ).subscribe();
  }

  public generateArt(callback: (art: string) => void): void {

    this.getAllCards().subscribe(cardsArray => {
      let art = '0';

      cardsArray.forEach((card: ICardInfo) => {
        if (+art < +card.art) {
          art = card.art;
        }
      });

      art = (+art + 1).toString();
      callback(art);
    });
  }

  private getAllCards(): Observable<ICardInfo[]> {
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

  private getNormalFormatCase(filters: IFilters): { [room: string]: string[] } {
    const formatRooms: { [room: string]: string[] } = {};
    for (const room in filters.shopByRoom) {
      let normalStr = room.replace(/([A-Z])/g, ' $1').trim().toLowerCase();
      normalStr = normalStr.charAt(0).toUpperCase() + normalStr.slice(1);
      formatRooms[normalStr] = filters.shopByRoom[room];
    }
    return formatRooms;
  }
}
