import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public cartItemCount: number = 0;
  public wishlistItemCount: number = 0;
  public email!: string;
  public searchStr: string = '';
  public searchStatus: boolean = false;

  constructor(private router: Router, private localStorageService: LocalStorageService, private authServise: AuthenticationService, private route: Router) { }

  ngOnInit() {
    this.changeCartItemCount();
    this.changeWishlistItemCount();
  }

  public navigateToHome(): void {
    this.router.navigate(['/home']);
    this.changeSearchStatus();
  }

  public navigateToProfile(): void {
    this.router.navigate(['/admin']);
    this.changeSearchStatus();
  }

  public navigateToCart(): void {
    this.router.navigate(['/cart']);
    this.changeSearchStatus();
  }

  public navigateToWishlist(): void {
    this.router.navigate(['/wishlist']);
    this.changeSearchStatus();
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

  public changeSearchInput(): void {
    this.searchStatus = !this.searchStatus;
  }

  public setEmail(): void {
    this.email = this.authServise.email;
  }

  private changeSearchStatus(): void {
    if (this.searchStatus)
      this.searchStatus = false;
  }
}
