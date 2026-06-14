import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, map, catchError } from 'rxjs';

import { ApiResponse } from 'core';
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
}
