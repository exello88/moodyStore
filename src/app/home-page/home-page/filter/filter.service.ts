import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface IFilters {
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
  constructor(private http: HttpClient) {}
  
  public getFilters(): Observable<IFilters> {
    return this.http.get<IFilters>('https://moodystore-37962-default-rtdb.firebaseio.com/FILTERS.json');
  }
}
