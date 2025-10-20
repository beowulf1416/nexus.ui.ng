import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../classes/api-response';
import { URL } from '../url';

@Injectable({
  providedIn: 'root'
})
export class UserRegistration {
 
  constructor(
    private http: HttpClient
  ) {}

  sign_up(
    id: string,
    email: string
  ) {
    return this.http.post<ApiResponse>(
      URL.sign_up,
      {
        id: id,
        email: email
      }
    );
  }

  sign_up_verified(
    sign_up_token: string,
    pw: string
  ) {
    return this.http.post<ApiResponse>(
      URL.sign_up_verified,
      {
        sign_up_token: sign_up_token,
        pw: pw
      }
    );
  }
}
