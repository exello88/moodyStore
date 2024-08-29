import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAllCardsObject } from '../../home-page/home-page/catalog/catalog.service';
import { environment } from '../../environments';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor(private http : HttpClient) { }

  public getAllCards(): Observable<IAllCardsObject> { 
    return this.http.get<IAllCardsObject>(environment.apiFireBase + '/CATALOG/Products.json');
  }
}
