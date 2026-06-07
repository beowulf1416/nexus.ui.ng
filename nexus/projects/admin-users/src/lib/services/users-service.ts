import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URLS } from '../constants';
import { ApiResponse } from 'core';

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

}
