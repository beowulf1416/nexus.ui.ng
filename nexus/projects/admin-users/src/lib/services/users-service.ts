import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URLS } from '../constants';
import { ApiResponse } from 'core';
import { UserData } from '../classes/user-data';


@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private http: HttpClient) {}

  fetch_users(filter: string, item_size: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${URLS.base_url}${URLS.fetch_users}`,
      {
        filter: filter,
        item_size: item_size,
      },
    );
  }

  add_user(user: UserData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${URLS.base_url}${URLS.add_user}`,
      {
        email: user.email,
      },
    );
  }
}
