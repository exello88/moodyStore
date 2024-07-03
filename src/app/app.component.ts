import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  navigateToWishlist() {
    this.router.navigate(['/wishlist']);
  }
}
