import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponse } from 'common';

import { URLS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class Registration {
  constructor(private http: HttpClient) {}

  register_email(
    register_id: string,
    email: string
  ): Observable<ApiResponse> {
    console.debug('register_email');

    return this.http.post<ApiResponse>(
      URLS.base_url + URLS.register_email,
      {
        id: register_id,
        email: email,
      }
    );
  }

  register_password(
    register_id: string,
    pw: string
  ): Observable<ApiResponse>{
    console.info('register_password');

    return this.http.post<ApiResponse>(
      URLS.base_url + URLS.register_password,
      {
        id: register_id,
        pw: pw,
      }
    );
  }
}
