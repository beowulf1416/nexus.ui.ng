import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, pipe, map, catchError } from 'rxjs';

import { ApiResponse, Uuid } from 'core';
import { URLS } from '../constants';
import { TenantItem } from '../models/tenant-item';


@Injectable({
  providedIn: 'root',
})
export class TenantsService {

  constructor(
    private http: HttpClient,
  ) {

  }

  fetch_tenants(filter: string): Observable<Array<TenantItem>> {
    return this.http.post<ApiResponse>(
      `${URLS.base_url}${URLS.fetch_tenants}`,
      {
        filter: filter
      }).pipe(
        map((r: ApiResponse) => {
          const tenants = (r.data as {
            tenants: Array<TenantItem>
          })
          return tenants.tenants;
        }),
        catchError((error) => {
          console.error(error);
          // throw new Error(error);
          throw error;
        }),
      );
  }

  fetch_tenant(tenant_id: Uuid): Observable<TenantItem> {
    return this.http.post<ApiResponse>(
      `${URLS.base_url}${URLS.fetch_tenant}`,
      {
        tenant_id: tenant_id.to_string(),
      }).pipe(
        map((r: ApiResponse) => {
          const tenant = (r.data as {
            tenant: TenantItem
          }).tenant;
          return tenant;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          // throw new Error(error);
          throw error;
        }),
      );
  }

  save_tenant(
    tenant_id: Uuid,
    name: string,
    description: string
  ): Observable<ApiResponse> {
    console.info('save_tenant');
    return this.http.post<ApiResponse>(
      `${URLS.base_url}${URLS.save_tenant}`,
      {
        tenant_id: tenant_id.to_string(),
        name: name,
        description: description
      }
    );
  }
}
