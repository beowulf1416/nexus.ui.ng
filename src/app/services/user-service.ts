import { Injectable, signal } from '@angular/core';

import { User } from '../classes/user';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../classes/api-response';
import { URL } from '../classes/urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public readonly current_user = signal(User.anonymous());

  constructor(
    private http: HttpClient
  ) {}

  sign_in(
    email: string,
    pw: string
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      URL.session_sign_in,
      {
        email: email,
        pw: pw
      },
      {
        observe: 'response'
      }
    ).pipe(
      map((value, index) => {
        if (value.ok && value.headers.has('authorization')) {
          let token = value.headers.get('authorization')?.replace('bearer', '')?.trim() || '';
          console.debug('token', token);
        }

        return new ApiResponse(
          false,
          '//todo',
          null
        );
      })
    );
  }
}
