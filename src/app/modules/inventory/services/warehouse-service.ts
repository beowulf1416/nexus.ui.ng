import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Uuid } from '../../../classes/uuid';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../classes/api-response';
import { CONSTANTS } from '../../../classes/constants';
import { INV_CONSTANTS } from '../classes/constants';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  constructor(
    private http: HttpClient
  ) {}


  warehouse_save(
    tenant_id: Uuid,
    warehouse_id: Uuid,
    name: string,
    description: string,
    address: string
  ): Observable<ApiResponse> {
    console.debug("warehouse_save");

    return this.http.post<ApiResponse>(
      CONSTANTS.api_base_url + INV_CONSTANTS.path_warehouse_save,
      {
        tenant_id: tenant_id.to_string(),
        warehouse_id: warehouse_id.to_string(),
        name: name,
        description: description,
        address: address
      }
    );
  }
}
