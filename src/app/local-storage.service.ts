import { Injectable } from '@angular/core';
import { ICardInfo } from './product-card/product-card.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  //app

  public changeCartItemCount(): number | null {
    if (typeof localStorage !== "undefined") {
      const shopingBagJson = localStorage.getItem('shopingBag');
      if (shopingBagJson) {
        let cartItemCount = 0;
        let shopingBag = JSON.parse(shopingBagJson);
        Object.keys(shopingBag).forEach(art => {
          cartItemCount += shopingBag[art];
        })
        return cartItemCount;
      }
    }
    return null
  }

  public changeWishlistItemCount(): number | null {
    if (typeof localStorage !== "undefined") {
      const shopingBagJson = localStorage.getItem('wishlist');
      if (shopingBagJson) {
        let shopingBag = JSON.parse(shopingBagJson);
        return shopingBag.length;
      }
    }
    return null
  }

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

  //wishlist

  public getWishlistCartItemsFromLocalStorage(): string[] | null {
    if (typeof localStorage !== 'undefined') {
      const shopingBagJson = localStorage.getItem('wishlist');
      if (shopingBagJson) {
        return JSON.parse(shopingBagJson);
      }
    }
    return null
  }

  public deleteWishlistCard(art: string): void {
    const wishlistJson = localStorage.getItem('wishlist');
    if (wishlistJson) {
      let wishlist = JSON.parse(wishlistJson);
      if (Array.isArray(wishlist))
        wishlist = wishlist.filter((cardArt: string) => cardArt !== art)
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }

  public initialWishlistButton(art: string): { addedToCart: boolean, productQuantity: number } | null {
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
    return null
  }

  public changeProductQualityWishlist(art: string, productQuantity: number): void {
    if (typeof localStorage !== 'undefined') {
      const shopingBagJson = localStorage.getItem('shopingBag');
      if (shopingBagJson) {
        let elementsFromBagArts = JSON.parse(shopingBagJson);
        elementsFromBagArts[art] = productQuantity;
        localStorage.setItem('shopingBag', JSON.stringify(elementsFromBagArts));
      }
    }
  }

  public initializingButtonColor(art: string): string {
    if (typeof localStorage !== 'undefined') {
      const wishlistJson = localStorage.getItem('wishlist');
      if (wishlistJson) {
        let wishlist = JSON.parse(wishlistJson);
        if (wishlist.includes(art))
          return 'red';
        else
          return 'black';
      }
    }
    return '';
  }
}
