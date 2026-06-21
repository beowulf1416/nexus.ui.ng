import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

import { URLS } from '../constants';
import { ApiResponse, Uuid } from 'core';
import { PermissionItem } from '../models/permission-item';


@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(
    private http: HttpClient
  ) {

  }


  fetch_permissions(filter: string): Observable<Array<PermissionItem>> {
    console.info('fetch_permissions');

    return this.http.post<ApiResponse>(
      `${URLS.base_url}${URLS.fetch_permissions}`,
      {
        filter: filter
      }
    ).pipe(
      map((r: ApiResponse) => {
        if (r.success && r.data) {
          const permissions = (r.data as {
            permissions: Array<PermissionItem>
          }).permissions;
          return permissions;
        } else {
          throw new Error(r.message);
        };
      }),
      catchError((e) => {
        console.error(e);
        throw e;
      }),
    );
  }
}
