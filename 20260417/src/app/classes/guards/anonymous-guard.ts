import { computed, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user-service';

export const anonymousGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user_service = inject(UserService);
  const is_anonymous = computed(() => user_service.current_user().is_anonymous);

  if (is_anonymous()) {
    return true;
  } else {
    return router.createUrlTree(['/dashboard'], {
      queryParams: {
        redirect: state.url
      }
    });
  }
};
