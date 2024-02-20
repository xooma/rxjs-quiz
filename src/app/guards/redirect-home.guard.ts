import { CanActivateFn, Router } from '@angular/router';
import { Location } from '@angular/common';
import { inject } from '@angular/core';

export const redirectHomeGuard: CanActivateFn = (route, state) => {
  const location = inject(Location);

  const canActivate =
    (location.path() === '/quiz' && state.url.includes('results')) ||
    (location.path() === '/home' && state.url.includes('quiz')) ||
    (!location.path() && !state.url.includes('home'));

  return canActivate ? true : inject(Router).navigate(['/']);
};
