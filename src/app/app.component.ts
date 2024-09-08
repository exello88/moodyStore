import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject } from 'rxjs';
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

  private dataSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchDataSubject : Observable<string> = this.dataSubject.asObservable();



  constructor(private router: Router, private localStorageService: LocalStorageService, private authServise: AuthenticationService, private route: Router) { }

  ngOnInit() {
    this.changeCartItemCount();
    this.changeWishlistItemCount();
  }

  public navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  public navigateToProfile(): void {
    this.router.navigate(['/admin']);
    if (this.searchStatus)
      this.searchStatus = false;
  }

  public navigateToCart(): void {
    this.router.navigate(['/cart']);
    if (this.searchStatus)
      this.searchStatus = false;
  }

  public navigateToWishlist(): void {
    this.router.navigate(['/wishlist']);
    if (this.searchStatus)
      this.searchStatus = false;
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
  public test: boolean = false;

  public changeSearchInput(): void {
    if (this.searchStatus !== false)
      this.dataSubject.next(this.searchStr);
    if (this.searchStr.trim() === '') {
      this.test = !this.test;
      this.searchStatus = !this.searchStatus;
      if (this.route.url !== '/home')
        this.route.navigate(['home'])
    }
  }

  public setEmail(): void {
    this.email = this.authServise.email;
  }
}
