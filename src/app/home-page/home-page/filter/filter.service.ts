import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
export class FilterService {
  constructor(private http: HttpClient) { }

  public getFilters(): Observable<IFilters> {
    return this.http.get<IFilters>('https://moodystore-37962-default-rtdb.firebaseio.com/FILTERS.json');
  }

  public getNormalFormatStr(key: string): string {
    let normalStr = key.replace(/([A-Z])/g, ' $1').trim().toLowerCase();
    normalStr = normalStr.charAt(0).toUpperCase() + normalStr.slice(1);

    return normalStr;
  }

  public getPriceRanges(filters : IFilters): { min: number; max: number }[] {
    let price = Object.keys(filters.Price).map(key => ({
      min: filters.Price[+key].min,
      max: filters.Price[+key].max
    }));
    
    return price;
  }
}
