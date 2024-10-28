import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { LoginService } from './login.service';

export const loginGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  return loginService.isUserLoggedIn().pipe(
    map(isLogged => !isLogged ? true : (router.navigateByUrl('/tienda'), false))
  );
};

export const authGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  return loginService.isUserLoggedIn().pipe(
    map(isLogged => isLogged ? true : (router.navigateByUrl('/login'), false))
  );
};
