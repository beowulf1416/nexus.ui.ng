import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

import { ApiResponse } from 'common';
import { map, Observable } from 'rxjs';
import { URLS } from '../constants';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}

  generate_hash(text: string): string {
    console.debug('generate_hash');

    return CryptoJS.AES.encrypt(text, text).toString();
  }

  authenticate(email: string, pw: string): Observable<ApiResponse> {
    console.debug('authenticate');

    const pw_hash = this.generate_hash(pw);

    return this.http
      .post<ApiResponse>(
        URLS.authenticate,
        {
          email: email,
          pw: pw_hash,
        },
        {
          observe: 'response',
        },
      )
      .pipe(
        map((v, i) => {
          console.debug('map', v, i);
          if (v.ok) {
            if (v.headers.has('authorization')) {
              let token =
                v.headers
                  .get('authorization')
                  ?.replace(/bearer/i, '')
                  ?.trim() || '';
              console.debug('token', token);

              sessionStorage.setItem('sid', token);

              return new ApiResponse(true, 'successfully authenticated', null);
            } else {
              return new ApiResponse(false, 'unable to authenticate', null);
            }
          } else {
            return new ApiResponse(false, 'unable to authenticate', null);
          }
        }),
      );
  }
}
