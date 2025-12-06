import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../classes/api-response';
import { URL } from '../urls';
import { map, Observable } from 'rxjs';
import { CONSTANTS } from '../../../classes/constants';
import { UserService } from '../../../services/user-service';

@Injectable({
  providedIn: 'root'
})
export class Authentication {
  
  constructor(
    private http: HttpClient,
    private us: UserService
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
        console.debug(value);
        if (value.ok) {
          if (value.ok && value.headers.has('authorization')) {
            let token = value.headers.get('authorization')?.replace(/bearer/i, '')?.trim() || '';
            console.debug('token', token);

            sessionStorage.setItem(CONSTANTS.session_auth_key, token);
            this.us.reload();

            return new ApiResponse(
              true,
              'success',
              null
            );
          }
        } else {
          console.error(value.statusText);

          return new ApiResponse(
            false,
            value.statusText,
            null
          );
        }

        return new ApiResponse(
          false,
          "invalid user/password combination",
          null
        );
      })
    );
  }
}
