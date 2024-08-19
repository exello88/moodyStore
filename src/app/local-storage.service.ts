import { Injectable } from '@angular/core';
import { ICardInfo } from './product-card/product-card.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  //productCard
  public deleteForCartProductCard(cardInfo: ICardInfo): void {
    const shopingBagJson = localStorage.getItem('shopingBag');
    if (shopingBagJson) {
      let shopingBag = JSON.parse(shopingBagJson);
      if (shopingBag[cardInfo.art]) {
        delete shopingBag[cardInfo.art];
      }
      localStorage.setItem('shopingBag', JSON.stringify(shopingBag));
    }
  }

  public changeProductQualityProductCard(art: string, productQuantity: number): void {
    if (typeof localStorage !== 'undefined') {
      const shopingBagJson = localStorage.getItem('shopingBag');
      if (shopingBagJson) {
        let elementsFromBagArts = JSON.parse(shopingBagJson);
        elementsFromBagArts[art] = productQuantity;
        localStorage.setItem('shopingBag', JSON.stringify(elementsFromBagArts));
      }
    }
  }

  public addToShopingBagProductCard(art: string): void {
    const shopingBagJson = localStorage.getItem('shopingBag');
    if (shopingBagJson) {
      let shopingBag: { [key: string]: number } = JSON.parse(shopingBagJson);
      shopingBag[art] = 1;
      localStorage.setItem('shopingBag', JSON.stringify(shopingBag));
    } else {
      let shopingBag: { [key: string]: number } = {};
      shopingBag[art] = 1;
      localStorage.setItem('shopingBag', JSON.stringify(shopingBag));
    }
  }

  public initialProductCardButton(art: string): { addedToCart: boolean, productQuantity: number } | null {
    if (typeof localStorage !== 'undefined') {
      const shopingBagJson = localStorage.getItem('shopingBag');
      if (shopingBagJson) {
        let shopingBag = JSON.parse(shopingBagJson);
        if (!shopingBag[art]) {
          return { addedToCart: false, productQuantity: 0 };
        }
        else {
          return { addedToCart: true, productQuantity: shopingBag[art] };
        }
      }
    }
    return null;
  }

  //Cart
  public changeProductQuantityCart(art: string, quantity: number): void {
    if (typeof localStorage !== 'undefined') {
      const shopingBagJson = localStorage.getItem('shopingBag');
      if (shopingBagJson) {
        let elementsFromBagArts = JSON.parse(shopingBagJson);
        elementsFromBagArts[art] = quantity;
        localStorage.setItem('shopingBag', JSON.stringify(elementsFromBagArts));
      } else {
        let shopingBag: { [key: string]: number } = {};
        shopingBag[art] = 1;
        localStorage.setItem('shopingBag', JSON.stringify(shopingBag));
      }
    }
  }

  public initializationProductQuantityCart(cardInfo: ICardInfo): { productQuantity: number, lastPrice: number } | null {
    if (typeof localStorage !== 'undefined') {
      const shopingBagJson = localStorage.getItem('shopingBag');
      if (shopingBagJson) {
        let shopingBag = JSON.parse(shopingBagJson);
        if (shopingBag[cardInfo.art]) {
          let productQuantity = shopingBag[cardInfo.art];
          let lastPrice = productQuantity * cardInfo.price;
          return { productQuantity: productQuantity, lastPrice: lastPrice };
        }
      }
    }
    return null;
  }
}
