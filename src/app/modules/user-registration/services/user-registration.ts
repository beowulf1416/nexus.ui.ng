import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../classes/api-response';
import { URL } from '../url';
import { Uuid } from '../../../classes/uuid';

@Injectable({
  providedIn: 'root'
})
export class UserRegistration {
 
  constructor(
    private http: HttpClient
  ) {}

  sign_up(
    id: Uuid,
    email: string
  ) {
    return this.http.post<ApiResponse>(
      URL.sign_up,
      {
        id: id.to_string(),
        email: email
      }
    );
  }

  sign_up_verified(
    register_id: Uuid,
    token: string,
    pw: string
  ) {
    return this.http.post<ApiResponse>(
      URL.sign_up_verified,
      {
        register_id: register_id.to_string(),
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
