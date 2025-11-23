import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../classes/api-response';
import { CONSTANTS } from '../../../classes/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
 
  constructor(
    private http: HttpClient
  ) {}


  fetch(
    filter: string
  ): Observable<ApiResponse> {
    console.info('fetch');

    return this.http.post<ApiResponse>(
      CONSTANTS.api_base_url + CONSTANTS.url_permissions_fetch,
      {
        filter: filter
      }
    );
  }
}
