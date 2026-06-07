import { Injectable, signal } from '@angular/core';
import { ApiResponse } from '../models/api-response';
import { map, Observable, catchError, of, mergeMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Tenant } from '../models/tenant';

import { URLS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public _current_user = signal(User.anonymous());

  constructor(
    private http: HttpClient
  ) {

  }

  get current_user() {
    return this._current_user.asReadonly();
  }

  sign_in(email: string, password: string): Observable<ApiResponse> {
    // return this.auth.authenticate(email, password).pipe(
    //   map((r: ApiResponse) => {
    //     if (r.success) {
    //       return r;
    //     }

    //     return new ApiResponse(false, r.message, null);
    //   }),
    //   catchError((e: any) => {
    //     console.error(e);

    //     return of(new ApiResponse(false, e.message, null));
    //   }),
    // );
    // // this._current_user.set(user);
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

              // return new ApiResponse(true, 'successfully authenticated', null);
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
    return this.http.post<ApiResponse>(
      URLS.base_url + URLS.fetch_current_user,
      {}
    ).pipe(
      map((r: ApiResponse) => {
        if (r.success) {
          let user_data = (r.data as {
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

        return r;
      }),
      catchError((e: any) => {
        console.error(e);

        return of(new ApiResponse(false, e.message, null));
      }),
    );
  }
}
