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
    register_id: string,
    token: string,
    pw: string
  ) {
    return this.http.post<ApiResponse>(
      URL.sign_up_verified,
      {
        register_id: register_id,
        token: token,
        pw: pw
      }
    );
  }

  get_registration_details(
    token: string
  ) {
    return this.http.post<ApiResponse>(
      URL.get_registration_details,
      {
        token: token
      }
    );
  }
}
