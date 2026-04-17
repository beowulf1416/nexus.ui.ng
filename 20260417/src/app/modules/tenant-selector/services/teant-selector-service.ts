import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../classes/api-response';
import { CONSTANTS } from '../../../classes/constants';

@Injectable({
  providedIn: 'root'
})
export class TeantSelectorService {
  

  constructor(
    private http: HttpClient
  ) {}


  search(
    filter: string
  ): Observable<ApiResponse> {
    console.info('search');

    return this.http.post<ApiResponse>(
      CONSTANTS.api_base_url + CONSTANTS.url_admin_tenants_search,
      {
        filter: filter
      }
    );
  }
}
