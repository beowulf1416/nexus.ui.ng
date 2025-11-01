import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user-service';
import { computed, inject } from '@angular/core';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user_service = inject(UserService);
  const is_authenticated = computed(() => user_service.current_user().is_authenticated);

  if (is_authenticated()) {
    return true;
  } else {
    return router.createUrlTree(['/auth/sign-in'], {
      queryParams: {
        redirect: state.url
      }
    });
  }
};
