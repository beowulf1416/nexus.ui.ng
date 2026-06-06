import { Injectable, signal } from '@angular/core';
import { ApiResponse } from 'common';
import { map, Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Auth } from '../services/auth';
import { URLS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public _current_user = signal(User.anonymous());

  constructor(
    private auth: Auth,
    private http: HttpClient
  ) {

  }

  get current_user() {
    return this._current_user.asReadonly();
  }

  sign_in(email: string, password: string): Observable<ApiResponse> {
    return this.auth.authenticate(email, password).pipe(
      map((r: ApiResponse) => {
        if (r.success) {
          return r;
        }

        return new ApiResponse(false, r.message, null);
      }),
      catchError((e: any) => {
        console.error(e);

        return of(new ApiResponse(false, e.message, null));
      }),
    );
    // this._current_user.set(user);
  }

  sign_out(): Observable<ApiResponse> {
    return this.auth.sign_out();
  }

  fetch_current_user(): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      URLS.base_url + URLS.fetch_current_user,
      {}
    ).pipe(
      map((r: ApiResponse) => {
        if (r.success) {
          this._current_user.set(r.data as User);
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
