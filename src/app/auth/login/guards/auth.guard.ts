import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../data-access/login.service';

export const isAuthenticatedGuard = (): CanActivateFn => {
  return () => {
    const loginService = inject(LoginService);
    const router = inject(Router);

    if (loginService.isLoggedIn()) {
      return true;
    }

    return router.parseUrl('/login');
  };
};
