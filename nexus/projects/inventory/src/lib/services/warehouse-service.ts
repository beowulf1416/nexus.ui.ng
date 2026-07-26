import { Service } from '@angular/core';
import { Observable } from 'rxjs';

import { Uuid } from 'core';
import { WarehouseData } from '../models/warehouse-data';

@Service()
export class WarehouseService {

  warehouses_fetch(filter: string): Observable<WarehouseData[]> {
    console.info('//todo warehouses_fetch');
    return new Observable<WarehouseData[]>();
  }

  warehouse_fetch(warehouse_id: Uuid): Observable<WarehouseData> {
    console.info('//todo warehouse_fetch');
    return new Observable<WarehouseData>();
  }
}
