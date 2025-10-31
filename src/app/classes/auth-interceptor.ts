import { HttpInterceptorFn } from '@angular/common/http';
import { CONSTANTS } from './constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sid = sessionStorage.getItem(CONSTANTS.session_auth_key) || '';

  // add auth header if sid exists
  let req_auth = req.clone();
  if (sid != '') {
    req_auth = req.clone({
      setHeaders: {
        Authorization: `Bearer ${sid}`
      }
    });
  }

  return next(req_auth);
};
