import { Injectable } from '@angular/core';
import { environment } from '../environments';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public auth: boolean = false;
  public admin: boolean = false;
  public email!: string;

  constructor(private http: HttpClient) { }

  public logInUsers(userLogIn: { email: string, password: string }): Observable<boolean> {
    return this.http.get<{ [key: string]: { email: string, password: string, admin: boolean } }>(`${environment.apiFireBase}/users/.json`).pipe(
      map(users => {
        let isRegistered = false;

        Object.keys(users).forEach(user => {
          if (users[user].email === userLogIn.email && users[user].password === userLogIn.password) {
            isRegistered = true;
            this.auth = true;
            this.admin = users[user].admin;
            this.email = users[user].email;
          }
        });

        return isRegistered;
      })
    );
  }

  public registerUsers(user: { email: string, password: string, admin: boolean }): Observable<string> {
    return this.checkRegistration(user.email).pipe(
      switchMap(isRegistered => {
        if (isRegistered) {
          return of('User is already registered');
        } else {
          return this.http.post(`${environment.apiFireBase}/users/.json`, user, {
            headers: { 'Content-Type': 'application/json' }
          }).pipe(
            map(() => {
              this.auth = true;
              this.admin = user.admin;
              this.email = user.email;
              return 'User successfully registered';
            })
          );
        }
      })
    );
  }

  private checkRegistration(email: string): Observable<boolean> {
    return this.http.get<{ [key: string]: { email: string } }>(`${environment.apiFireBase}/users/.json`).pipe(
      map(users => {
        let isRegistered = false;
        Object.keys(users).forEach(user => {
          if (users[user].email === email) {
            isRegistered = true;
          }
        });
        return isRegistered;
      })
    );
  }
}
