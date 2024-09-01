import { Injectable } from '@angular/core';
import { environment } from '../environments';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { EmailValidator } from '@angular/forms';
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
export class ProfileService {

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

  public getItemForMegaMenu(filters: IFilters): TreeNode[] {
    const treeMenuItems: TreeNode[] = [];

    treeMenuItems.push({
      label: 'New Arrivals',
      children: filters.newArrivals.map(item => ({ label: item }))
    });

    treeMenuItems.push({
      label: 'Shop By Room',
      children: Object.entries(filters.shopByRoom).map(([room, items]) => ({
        label: room,
        children: items.map(item => ({ label: item }))
      }))
    });

    treeMenuItems.push({
      label: 'Shop by concept',
      children: filters.shopByConcept.map(item => ({ label: item }))
    });

    return treeMenuItems;
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

  public logInUsers(userLogIn: { email: string, password: string }, callback: (isRegistered: boolean, admin: boolean) => void): void {
    fetch(environment.apiFireBase + '/users/.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(users => {
        let isRegistered = false;
        let admin = false;
        Object.keys(users).forEach(user => {
          if (users[user].email === userLogIn.email && users[user].password === userLogIn.password) {
            isRegistered = true;
            if (users[user].admin)
              admin = true;
          }
        });
        callback(isRegistered, admin);
      })
  }

  public registerUsers(user: { email: string, password: string, admin: boolean }, callback: (errorMessage: string) => void): void {
    this.checkRegistration(user.email, (isRegistered) => {
      if (isRegistered) {
        callback('User is already registered')
      } else {
        fetch(environment.apiFireBase + '/users/.json', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(data => {
            callback('User successfully registered')
          })
      }
    });
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

  public addCardToFB(selectedMode: string, selectedCategory: string, newCard: ICardsInfo): void {
    fetch(environment.apiFireBase + '/CATALOG/' + selectedMode + '/' + selectedCategory + '.json')
      .then(response => response.json())
      .then(lustCards => {
        const newCards = lustCards ? [...lustCards, newCard] : [newCard];
        return fetch(environment.apiFireBase + '/CATALOG/' + selectedMode + '/' + selectedCategory + '.json', {
          method: 'PUT',
          body: JSON.stringify(newCards),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      })
  }

  private checkRegistration(email: string, callback: (isRegistered: boolean) => void): void {
    fetch(environment.apiFireBase + '/users/.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(users => {
        let isRegistered = false;
        Object.keys(users).forEach(user => {
          if (users[user].email === email) {
            isRegistered = true;
          }
        });
        callback(isRegistered);
      })
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
