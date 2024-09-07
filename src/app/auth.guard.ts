import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';

export const adminAuth: CanActivateFn = (route, state) => {
  const authComponent = inject(AuthenticationService);
  const router = inject(Router);

  const admin = authComponent.admin;
  const auth = authComponent.auth;

  if (admin && auth) {
    return true;
  } else {
    router.navigate(['/user']);
    return false;
  }
};

export const userAuth: CanActivateFn = (route, state) => {
  const authComponent = inject(AuthenticationService);
  const router = inject(Router);

  const auth = authComponent.auth;

  if (auth) {
    return true;
  } else {
    router.navigate(['/authentication']);
    return false;
  }
};

export const noAuth: CanActivateFn = (route, state) => {
  const authComponent = inject(AuthenticationService);
  const router = inject(Router);

  const auth = authComponent.auth;

  if (auth) {
    router.navigate(['/admin']);
    return false;
  } else {
    return true;
  }
};
