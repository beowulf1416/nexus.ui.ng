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

  fetch_role(role_id: Uuid): Observable<RoleItem> {
    return this.http.post<ApiResponse>(
      `${URLS.base_url}${URLS.fetch_role}`,
      {
        role_id: role_id.to_string(),
      }
    ).pipe(
      map((r: ApiResponse) => {
        if (r.success) {
          const role: RoleItem = (r.data as {
            role: RoleItem
          }).role;
          return role;
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
    tenant_id: Uuid,
    role_id: Uuid,
    name: string,
    description: string,
  ): Observable<ApiResponse> {
    console.info('save_role');

    return this.http.post<ApiResponse>(
      `${URLS.base_url}${URLS.save_role}`,
      {
        tenant_id: tenant_id.to_string(),
        role_id: role_id.to_string(),
        name: name,
        description: description,
      }
    );
  }

  roles_set_active(
    role_ids: Array<Uuid>,
    active: boolean,
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${URLS.base_url}${URLS.role_set_active}`,
      {
        role_ids: role_ids,
        active: active,
      }
    );
  }

  assign_permissions(
    role_ids: Array<Uuid>,
    permission_ids: Array<number>,
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${URLS.base_url}${URLS.assign_permissions}`,
      {
        role_ids: role_ids.map((r) => r.to_string()),
        permission_ids: permission_ids,
      }
    );
  }

  revoke_permissions(
    role_ids: Array<Uuid>,
    permission_ids: Array<number>,
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${URLS.base_url}${URLS.assign_permissions}`,
      {
        role_ids: role_ids,
        permission_ids: permission_ids,
      }
    );
  }
}
