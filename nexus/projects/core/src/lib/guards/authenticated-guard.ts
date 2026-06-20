import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { UserService } from '../services/user-service';


export const authenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user_service = inject(UserService);

  if (user_service.current_user().is_authenticated) {
    return true;
  } else {
    return router.createUrlTree(['/session/sign-in'], {
      queryParams: {
        redirect: state.url
      }
    });
  }
};
