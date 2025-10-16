import { CanActivateFn } from '@angular/router';

export const anonymousGuard: CanActivateFn = (route, state) => {
  return true;
};
