import { Component, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ProfileComponent {
  public auth: boolean = false;
  public admin: boolean = false;

  constructor(private appComponent: AppComponent, private router: Router) { }

  ngOnInit() {
    this.auth = this.appComponent.auth;
    this.admin = this.appComponent.admin;
  }


  public changeAuthStatus(admin: boolean): void {
    this.auth = true;
    this.admin = admin;
  }

  public navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  public navigateToWishlist(): void {
    this.router.navigate(['/wishlist']);
  }
}
