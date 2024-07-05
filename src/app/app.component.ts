import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router) {}

  public navigateToHome() : void {
    this.router.navigate(['/home']);
  }

  public navigateToProfile() : void {
    this.router.navigate(['/profile']);
  }

  public navigateToCart() : void {
    this.router.navigate(['/cart']);
  }

  public navigateToWishlist() : void {
    this.router.navigate(['/wishlist']);
  }
}
