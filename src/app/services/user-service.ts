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
          console.debug('reload', r);
          if (r.success) {
            let u = (r.data as {
              user: {
                name: string,
                permissions: Array<number>,
                tenant: {
                  id: string,
                  name: string,
                  description: string,
                },
                tenants: Array<{
                  id: string,
                  name: string,
                  description: string
                }>
              }
            }).user;

            let tenant = new Tenant(
              u.tenant.id,
              u.tenant.name
            );
            let user = new User(
              u.name,
              tenant,
              u.tenants.map((t) => {
                return new Tenant(
                  t.id,
                  t.name
                );
              }),
              u.permissions
            );
            this.current_user.set(user);
            this.current_tenant.set(tenant);
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

  switch_tenant(tenant_id: string): Observable<ApiResponse> {
    console.debug('switch_tenant', tenant_id);

    return this.http.post<ApiResponse>(
      CONSTANTS.api_base_url + CONSTANTS.switch_tenant,
      {
        tenant_id: tenant_id
      },
      {
        observe: 'response'
      }
    ).pipe(
      map((value, index) => {
        if (value.ok && value.headers.has('authorization')) {
          let token = value.headers.get('authorization')?.replace(/bearer/i, '')?.trim() || '';
          console.info(token);

          sessionStorage.setItem(CONSTANTS.session_auth_key, token);
          this.reload();

          return new ApiResponse(
            true,
            'success',
            null
          );
        } else {
          console.error(value.statusText);

          return new ApiResponse(
            false,
            value.statusText,
            null
          );
        }
      })
    );
  }
}

