import { computed, inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { UserService } from '../../services/user-service';
import { PERMISSIONS } from '../permissions';

export const authorizedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user_service = inject(UserService);
  const has_permission = computed(() => user_service.current_user().permissions.includes(PERMISSIONS.admin_dashboard_view));

  if (has_permission()) {
    return true;
  } else {
    console.debug(route, state);
    return router.createUrlTree(['/auth/sign-in'], {
      queryParams: {
        redirect: state.url
      }
    });
  }
};
