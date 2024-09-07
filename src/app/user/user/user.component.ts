import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UserComponent {
  public auth: boolean = false;
  public admin: boolean = false;

  constructor(private appComponent : AppComponent, private router: Router,  private authServise: AuthenticationService) { }

  ngOnInit() {
    this.auth = this.authServise.auth;
    this.admin = this.authServise.admin;
  }

  public navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  public navigateToWishlist(): void {
    this.router.navigate(['/wishlist']);
  }

  public logOut(): void {
    this.authServise.admin = false;
    this.authServise.auth = false;
    this.authServise.email = '';
    this.appComponent.setEmail();
    this.router.navigate(['/authentication']);
  }
}
