import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

import { URLS } from '../constants';
import { ApiResponse, Uuid } from 'core';
import { RoleItem } from '../models/role-item';


@Injectable({
  providedIn: 'root',
})
export class RoleService {

  constructor(
    private http: HttpClient
  ) { }

  fetch_roles(tenant_id: Uuid, filter: string): Observable<Array<RoleItem>> {
    return this.http.post<ApiResponse>(
      `${URLS.base_url}${URLS.fetch_roles}`,
      {
        tenant_id: tenant_id.to_string(),
        filter: filter
      }
    ).pipe(
      map((r: ApiResponse) => {
        if (r.success) {
          const roles: Array<RoleItem> = (r.data as {
            roles: Array<RoleItem>
          }).roles;
          return roles;
        } else {
          throw new Error(r.message);
        }
      }),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }

  save_role(
    role_id: Uuid,
    name: string,
    description: string,
  ): Observable<ApiResponse> {
    console.info('save_role');

    return this.http.post<ApiResponse>(
      `${URLS.base_url}${URLS.save_role}`,
      {
        role_id: role_id,
        name: name,
        description: description,
      }
    );
  }
}
