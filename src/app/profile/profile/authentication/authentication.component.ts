import { Component, ElementRef, EventEmitter, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProfileService } from '../../profile.service';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AuthenticationComponent {
  public logInStatus: boolean = true;
  public email!: string;
  public password!: string;
  public repeatPassword!: string;
  public errorMessage!: string;

  @Output() changeAuthStatus: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private profileServise: ProfileService, private appComponent: AppComponent) { }

  public authentication(): void {
    if (this.logInStatus)
      this.logIn();
    else
      this.signUp();
  }

  private logIn(): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.errorMessage = "Enter a correct email address";
    }
    else if (this.password.length < 4) {
      this.errorMessage = "Password must be longer than 4 characters";
    }
    else {
      this.profileServise.logInUsers({ email: this.email, password: this.password }, (isRegistered, admin) => {
        if (isRegistered) {
          this.changeAuthStatus.emit(admin);
          this.appComponent.admin = admin;
          this.appComponent.auth = true
        }
        else
          this.errorMessage = "User not found";

      });
    }
  }

  private signUp(): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.errorMessage = "Enter a correct email address";
    }
    else if (this.password.length < 4) {
      this.errorMessage = "Password must be longer than 4 characters";
    }
    else if (this.password !== this.repeatPassword) {
      this.errorMessage = "Passwords don't match";
    }
    else {
      this.profileServise.registerUsers({ email: this.email, password: this.password, admin: false }, (message) => {
        if (message === 'User successfully registered')
          this.logIn();
        else
          this.errorMessage = message;
      })
    }
  }
}
