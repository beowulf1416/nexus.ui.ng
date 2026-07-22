import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, pipe, map, catchError } from 'rxjs';

import { ApiResponse, Uuid } from 'core';
import { URLS } from '../constants';
import { TenantItem } from '../models/tenant-item';
import { TenantData } from '../models/tenant-data';


@Injectable({
  providedIn: 'root',
})
export class TenantsService {

  constructor(
    private http: HttpClient,
  ) {

  }

  fetch_tenants(filter: string): Observable<Array<TenantData>> {
    return this.http.post<ApiResponse>(
      URLS.fetch_tenants,
      {
        filter: filter
      }).pipe(
        map((r: ApiResponse) => {
          const tenants = (r.data as {
            tenants: Array<TenantData>
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

  fetch_tenant(tenant_id: Uuid): Observable<TenantData> {
    return this.http.post<ApiResponse>(
      URLS.fetch_tenant,
      {
        tenant_id: tenant_id.to_string(),
      }).pipe(
        map((r: ApiResponse) => {
          const tenant = (r.data as {
            tenant: TenantData
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
    description: string,
    version: number | null
  ): Observable<ApiResponse> {
    console.info('save_tenant');
    return this.http.post<ApiResponse>(
      URLS.save_tenant,
      {
        tenant_id: tenant_id.to_string(),
        name: name,
        description: description,
        version: version == null ? 0 : version
      }
    );
  }

  set_active(
    tenant_ids: Array<Uuid>,
    active: boolean,
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      URLS.set_active,
      {
        tenant_ids: tenant_ids.map((id) => id.to_string()),
        active: active,
      }
    );
  }
}
