import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiResponse } from '../../../../../classes/api-response';
import { CONSTANTS } from '../../../../../classes/constants';

@Injectable({
  providedIn: 'root'
})
export class TenantsService {
  
  constructor(
    private http: HttpClient
  ) {}


  tenant_save(
    tenant_id: string,
    name: string,
    description: string
  ): Observable<ApiResponse> {
    console.debug('tenant_save');

    return this.http.post<ApiResponse>(
      CONSTANTS.api_base_url + CONSTANTS.url_admin_tenant_save,
      {
        tenant_id: tenant_id,
        name: name,
        description: description
      }
    );
  }

  tenants_search(
    filter: string
  ): Observable<ApiResponse> {
    console.debug('tenants_search');

    return this.http.post<ApiResponse>(
      CONSTANTS.api_base_url + CONSTANTS.url_admin_tenants_search,
      {
        filter: filter
      }
    );
  }

  tenant_fetch_by_id(
    tenant_id: string
  ): Observable<ApiResponse> {
    console.info('tenant_fetch_by_id');

    return this.http.post<ApiResponse>(
      CONSTANTS.api_base_url + CONSTANTS.url_tenant_fetch_by_id,
      {
        tenant_id: tenant_id
      }
    );
  }

  tenant_users_fetch(
    tenant_id: string,
    filter: string
  ): Observable<ApiResponse> {
    console.info('tenant_users_fetch');

    return this.http.post<ApiResponse>(
      CONSTANTS.api_base_url + CONSTANTS.url_tenant_users_fetch,
      {
        tenant_id: tenant_id,
        filter: filter
      }
    );
  }

  tenant_set_active(
    tenant_ids: Array<string>,
    active: boolean
  ): Observable<ApiResponse> {
    console.info('tenant_set_active');

    return this.http.post<ApiResponse>(
      CONSTANTS.api_base_url + CONSTANTS.url_admin_tenants_set_active,
      {
        tenant_ids: tenant_ids,
        active: active
      }
    );
  }
}
