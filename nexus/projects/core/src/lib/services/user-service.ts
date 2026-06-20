import { Injectable, signal } from '@angular/core';
import { ApiResponse } from '../models/api-response';
import { map, Observable, catchError, of, mergeMap, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Tenant } from '../models/tenant';

import { URLS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private  _current_user = signal(User.anonymous());
  private _tenants = signal(new Array<Tenant>(
    Tenant.default()
  ));

  constructor(
    private http: HttpClient
  ) {

  }

  get current_user() {
    return this._current_user.asReadonly();
  }

  get tenants() {
    return this._tenants.asReadonly();
  }

  sign_in(email: string, password: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
        URLS.base_url + URLS.authenticate,
        {
          email: email,
          pw: password,
        },
        {
          observe: 'response',
        },
      )
      .pipe(
        mergeMap((v, i) => {
          // console.debug('map', v);
          if (v.ok) {
            if (v.headers.has('authorization')) {
              let token =
                v.headers
                  .get('authorization')
                  ?.replace(/bearer/i, '')
                  ?.trim() || '';
              sessionStorage.setItem('sid', token);

              return this.fetch_current_user();
            } else {
              return of(new ApiResponse(false, 'unable to authenticate', null));
            }
          } else {
            return of(new ApiResponse(false, 'unable to authenticate', null));
          }
        }),
      );
  }

  sign_out(): Observable<ApiResponse> {
    sessionStorage.removeItem('sid');

    return of(new ApiResponse(true, 'successfully signed out', null));
  }

  fetch_current_user(): Observable<ApiResponse> {
    let o_user = this.http.post<ApiResponse>(
      URLS.base_url + URLS.fetch_current_user,
      {}
    );

    let o_tenants = this.http.post<ApiResponse>(
      URLS.base_url + URLS.fetch_tenants,
      {}
    );

    return forkJoin([o_user, o_tenants]).pipe(
      map(([r_user, r_tenants], i) => {
        if (r_user.success) {
          if (r_user.success) {
            let user_data = (r_user.data as {
              user: {
                name: string;
                tenant: Tenant;
                permissions: Array<string>
              }
            }).user;
            let user = new User(
              user_data.name,
              user_data.tenant,
              user_data.permissions
            );
            this._current_user.set(user);
          }
        }

        console.debug('tenants', r_tenants);
        if (r_tenants.success) {
          let tenants_data = (r_tenants.data as {
            tenants: Array<Tenant>
          }).tenants;
          this._tenants.set(tenants_data);
        }

        return new ApiResponse(true, 'success', null);
      }),
      catchError((e: any) => {
        console.error(e);

        return of(new ApiResponse(false, e.message, null));
      }),
    );
  }
}
