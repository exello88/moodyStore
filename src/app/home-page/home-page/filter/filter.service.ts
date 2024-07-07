import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface IFilters {
  'New Arrivals': string[];
  'Shop By Room': { [room: string]: string[] };
  'shop by concept': string[];
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
