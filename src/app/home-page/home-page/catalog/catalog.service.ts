import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface CardInfo {
  art: string;
  description: string;
  image: string;
  name: string;
  price: number;
  color: string;
}

export interface ISelectedItems {
  typeProduct: string[];
  price: {
    [key: number]: {
      'min': number;
      'max': number;
    };
  };
  Color: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  constructor(private http: HttpClient) { }

  public getCardForDrawing(activeFilters: string[], mode: string): Observable<CardInfo[]> {
    const observables = this.getFilteredCards(activeFilters, mode);
    console.log(activeFilters);

    return forkJoin(observables).pipe(
      map(cards => cards.filter(card => card !== null && card !== undefined)),
      map(cards => cards.flatMap(card => card))
    );
  }

  private getFilteredCards(activeFilters: string[], mode: string): Observable<CardInfo[]>[] {
    const observables: Observable<CardInfo[]>[] = [];
    activeFilters.forEach(filter => {
      observables.push(this.getFilterCard(filter, mode));
    });
    return observables;
  }

  private getFilterCard(filterName: string, mode: string): Observable<CardInfo[]> {
    filterName = this.convertToCamelCase(filterName);
    return this.http.get<CardInfo[]>(`https://moodystore-37962-default-rtdb.firebaseio.com/CATALOG/${mode}/${filterName}.json`);
  }

  private convertToCamelCase(input: string): string {
    const words = input.split('\n');

    const camelCaseWords = words.map((word) => {
      const trimmedWord = word.trim();
      const firstLetter = trimmedWord.charAt(0).toLowerCase();
      const restOfWord = trimmedWord.slice(1).replace(/\s+(\w)/g, (match, char) => char.toUpperCase());
      return firstLetter + restOfWord;
    });

    return camelCaseWords.join('');
  }

  public filterCards(allCards: CardInfo[], selectedItems: ISelectedItems): CardInfo[] {
    return allCards.filter(card => {
      if (selectedItems.Color.length > 0 && !selectedItems.Color.includes(card.color)) {
        return false;
      }

      if (Object.keys(selectedItems.price).length > 0) {
        return Object.values(selectedItems.price).some(priceRange => {
          return card.price >= priceRange.min && card.price <= priceRange.max;
        });
      }

      return true;
    });
  }

}
