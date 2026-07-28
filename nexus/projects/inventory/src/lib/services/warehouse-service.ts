import { inject, Service } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

import { ApiResponse, Uuid } from 'core';
import { WarehouseData } from '../models/warehouse-data';
import { HttpClient } from '@angular/common/http';
import { URLS } from '../inventory.constants';

@Service()
export class WarehouseService {

  private http = inject(HttpClient);

  warehouses_fetch(filter: string): Observable<WarehouseData[]> {
    return this.http.post<ApiResponse>(URLS.warehouses_fetch, { filter }).pipe(
      map((r: ApiResponse) => {
        if (r.success && r.data) {
          const warehouses = (r.data as { warehouses: WarehouseData[] }).warehouses;
          return warehouses;
        }
        return new Array<WarehouseData>();
      }),
      catchError((e: any) => {
        console.error(e);
        throw e;
      })
    );
  }

  warehouse_fetch(warehouse_id: Uuid): Observable<WarehouseData> {
    console.info('//todo warehouse_fetch');
    return new Observable<WarehouseData>();
  }

  warehouse_save(warehouse: WarehouseData): Observable<ApiResponse> {
    console.info('warehouse_save');
    return this.http.post<ApiResponse>(URLS.warehouse_save, {
      warehouse_id: warehouse.warehouse_id.to_string(),
      active: warehouse.active,
      version: warehouse.version,
      name: warehouse.name,
      description: warehouse.description,
      address: warehouse.address,
    });
  }
}
