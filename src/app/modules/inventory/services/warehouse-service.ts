import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Uuid } from '../../../classes/uuid';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../classes/api-response';
import { CONSTANTS } from '../../../classes/constants';
import { INV_CONSTANTS } from '../classes/constants';
import { Warehouse } from '../classes/warehouse';


@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  constructor(
    private http: HttpClient
  ) {}


  warehouse_save(
    tenant_id: Uuid,
    warehouse: Warehouse
  ): Observable<ApiResponse> {
    console.debug("warehouse_save", warehouse);

    return this.http.post<ApiResponse>(
      CONSTANTS.api_base_url + INV_CONSTANTS.path_warehouse_save,
      {
        tenant_id: tenant_id.to_string(),
        warehouse_id: warehouse.id,
        name: warehouse.name,
        description: warehouse.description,
        address: {
          street: warehouse.address.street,
          city: warehouse.address.city,
          state: warehouse.address.state,
          zip: warehouse.address.zip,
          country_id: warehouse.address.country_id
        }
      }
    );
  }
}
