import { HttpInterceptorFn } from '@angular/common/http';
import { CONSTANTS } from '../constants';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sid = sessionStorage.getItem(CONSTANTS.session_key);

  // add auth header if sid exists
  let req_auth = req.clone();
  if (sid) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${sid}`,
      },
    });
  }
  return next(req_auth);
};
