import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../../classes/api-response';
import { CONSTANTS } from '../../../../../classes/constants';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) {}


  users_search(
    filter: string
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      CONSTANTS.api_base_url + CONSTANTS.url_users_search,
      {
        filter: filter
      }
    );
  }
}
