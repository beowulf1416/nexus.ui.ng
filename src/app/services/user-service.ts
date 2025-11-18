import { Injectable, signal } from '@angular/core';

import { User } from '../classes/user';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../classes/api-response';
import { Tenant } from '../classes/tenant';
import { CONSTANTS } from '../classes/constants';
import { NotificationService } from './notification-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public readonly current_user = signal(User.anonymous());
  public readonly current_tenant = signal(Tenant.default());
  public readonly tenants = signal(new Array<Tenant>());

  constructor(
    private http: HttpClient,
    private ns: NotificationService
  ) {}

  reload() {
    let token = sessionStorage.getItem(CONSTANTS.session_auth_key) || '';
    if (token != '') {
      this.http.post<ApiResponse>(
        CONSTANTS.api_base_url + CONSTANTS.auth_user,
        {}
      ).subscribe({
        next: (r: ApiResponse) => {
          if (r.success) {
            let u = (r.data as {
              user: User
            }).user;
            let user = new User(
              u.name,
              u.tenant,
              u.permissions
            );
            this.current_user.set(user);
          }
        },
        error: (e) => {
          console.error(e);
          this.ns.error(e, null);
        },
        complete: () => {
          console.info('complete');
        }
      });
    }
  }

  sign_out() {
    sessionStorage.removeItem(CONSTANTS.session_auth_key);
    this.current_user.set(User.anonymous());
  }
}
