import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../../classes/api-response';
import { CONSTANTS } from '../../../../../classes/constants';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) {}


  user_save(
    user_id: string,
    email: string,
    password: string
  ): Observable<ApiResponse> {
    console.info('user_save');

    return this.http.post<ApiResponse>(
      CONSTANTS.api_base_url + CONSTANTS.url_user_save,
      {
        user_id: user_id,
        email: email,
        pw: password
      }
    );
  }


  users_search(
    filter: string
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      CONSTANTS.api_base_url + CONSTANTS.url_users_search,
      {
        filter: filter
      }
    );
  }

  users_set_active(
    user_ids: Array<string>,
    active: boolean
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      CONSTANTS.api_base_url + CONSTANTS.url_users_set_active_multiple,
      {
        user_ids: user_ids,
        active: active
      }
    );
  }

  user_assign_tenant(
    user_ids: Array<string>,
    tenant_ids: Array<string>
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      CONSTANTS.api_base_url + CONSTANTS.url_users_assign_tenants,
      {
        user_ids: user_ids,
        tenant_ids: tenant_ids
      }
    );
  }
}
