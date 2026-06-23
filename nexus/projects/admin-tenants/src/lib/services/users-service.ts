import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';

import { NotificationService, ApiResponse, Uuid } from 'core';
import { URLS } from '../constants';
import { UserItem } from '../models/user-item';


@Service()
export class UsersService {

  notification_service = inject(NotificationService);
  http = inject(HttpClient);


  constructor() {
  }


  fetch_users(
    tenant_id: Uuid,
    filter: string
  ): Observable<Array<UserItem>> {
    return this.http.post<ApiResponse>(
      `${URLS.base_url}${URLS.fetch_users}`,
      {
        tenant_id: tenant_id.to_string(),
        filter: filter
      }
    ).pipe(
      map((r: ApiResponse) => {
        if (r.success) {
          if (r.data) {
            let users = (r.data as {
              users: Array<UserItem>
            }).users;
            return users;
          } else {
            return new Array<UserItem>();
          }
        } else {
          return new Array<UserItem>();
        }
      }),
      catchError((e: any) => {
        console.error(e);
        throw e;
      })
    );
  }
}
