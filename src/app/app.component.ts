import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public cartItemCount: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.changeCartItemCount();
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
    if (typeof localStorage !== "undefined") {
      const shopingBagJson = localStorage.getItem('shopingBag');
      if (shopingBagJson) {
        let shopingBag = JSON.parse(shopingBagJson);
        this.cartItemCount = shopingBag.length;
      }
    }
  }
}
