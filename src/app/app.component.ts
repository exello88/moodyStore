import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public cartItemCount: number = 0;
  public wishlistItemCount: number = 0;
  public admin: boolean = false;
  public auth: boolean = false;

  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.changeCartItemCount();
    this.changeWishlistItemCount();
  }

  public navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  public navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  public navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  public navigateToWishlist(): void {
    this.router.navigate(['/wishlist']);
  }

  public changeCartItemCount(): void {
    let cartItemCount = this.localStorageService.changeCartItemCount();
    if (cartItemCount !== null)
      this.cartItemCount = cartItemCount;
  }

  public changeWishlistItemCount(): void {
    let wishlistItemCount = this.localStorageService.changeWishlistItemCount();
    if (wishlistItemCount !== null)
      this.wishlistItemCount = wishlistItemCount;
  }
}
