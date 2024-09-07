import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AuthenticationComponent {
  public logInStatus: boolean = true;
  public admin!: boolean;
  public auth!: boolean;
  public email!: string;
  public password!: string;
  public repeatPassword!: string;
  public errorMessage!: string;
  public loaderStatus: boolean = false;

  private subscribions!: Subscription;

  constructor(private authServise: AuthenticationService, private router: Router, private appComponent: AppComponent) { }

  ngOnDestroy() {
    if (this.subscribions)
      this.subscribions.unsubscribe();
  }

  public authentication(): void {
    this.loaderStatus = true;
    if (this.logInStatus)
      this.logIn();
    else
      this.signUp();
  }

  private logIn(): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.errorMessage = "Enter a correct email address";
      this.loaderStatus = false;
    }
    else if (this.password.length < 4) {
      this.errorMessage = "Password must be longer than 4 characters";
      this.loaderStatus = false;
    }
    else {
      this.subscribions = this.authServise.logInUsers({ email: this.email, password: this.password }).subscribe({
        next: ({ isRegistered, passwordIncorrect }) => {
          if (isRegistered) {
            this.router.navigate(['admin']);
          } else if (passwordIncorrect)
            this.errorMessage = "Incorrect password";
          else
            this.errorMessage = "User not found";
          this.loaderStatus = false;

          this.appComponent.setEmail();
        }
      });
    }
  }

  private signUp(): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.errorMessage = "Enter a correct email address";
      this.loaderStatus = false;
    }
    else if (this.password.length < 4) {
      this.errorMessage = "Password must be longer than 4 characters";
      this.loaderStatus = false;
    }
    else if (this.password !== this.repeatPassword) {
      this.errorMessage = "Passwords don't match";
      this.loaderStatus = false;
    }
    else {
      this.subscribions = this.subscribions = this.authServise.registerUsers({ email: this.email, password: this.password, admin: false }).subscribe({
        next: (error) => {
          this.errorMessage = error;
          this.loaderStatus = false;
          this.router.navigate(['admin']);
          this.appComponent.setEmail();
        }
      });
    }
  }
}
