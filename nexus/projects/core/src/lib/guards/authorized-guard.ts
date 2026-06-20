import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { UserService } from '../services/user-service';


export const authorizedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user_service = inject(UserService);
  const user = user_service.current_user();

  console.debug(route?.data);

  const permission = route?.data['permission'];
  if (user.is_authorized(permission)) {
    return true;
  } else {
    return router.createUrlTree(['/session/unauthorized'], {
      queryParams: {
        redirect: state.url
      }
    });
  }
};
