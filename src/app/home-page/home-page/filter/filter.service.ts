import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MegaMenuItem, MenuItem } from 'primeng/api';

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
    return this.http.get<IFilters>('https://moodystore-37962-default-rtdb.firebaseio.com/FILTERS.json')
      .pipe(
        map(data => {
          data.shopByRoom = this.getNormalFormatCase(data);
          return data;
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

  public getItemForMegaMenu(filters: IFilters): MegaMenuItem[] {
    const megaMenuItems: MegaMenuItem[] = [];

    
    megaMenuItems.push({
      label: 'New Arrivals',
      items: [filters.newArrivals.map(item => ({ label: item }))]
    });

    
    megaMenuItems.push({
      label: 'Shop By Room',
      items: [Object.entries(filters.shopByRoom).map(([room, items]) => ({
        label: room,
        items: items.map(item => ({ label: item }))
      }))],
    });

    
    megaMenuItems.push({
      label: 'Shop by concept',
      items: [filters.shopByConcept.map(item => ({ label: item }))]
    });


    return megaMenuItems;
  }
}
