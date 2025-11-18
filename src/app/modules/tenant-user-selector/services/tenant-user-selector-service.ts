import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../classes/api-response';
import { CONSTANTS } from '../../../classes/constants';

@Injectable({
  providedIn: 'root',
})
export class TenantUserSelectorService {
  
  constructor(
    private http: HttpClient
  ) {}

  fetch(
    tenant_id: string,
    filter: string
  ): Observable<ApiResponse> {
    console.debug('//todo', tenant_id, filter);
    
    return this.http.post<ApiResponse>(
      CONSTANTS.api_base_url + CONSTANTS.url_tenant_users_fetch,
      {
        tenant_id: tenant_id,
        filter: filter
      }
    );
  }
}
