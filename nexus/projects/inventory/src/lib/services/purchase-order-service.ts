import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponse } from 'core';
import { URLS } from '../inventory.constants';
import { PurchaseOrderData } from '../models/purchase-order-data';

@Service()
export class PurchaseOrderService {

  private http = inject(HttpClient);

  save(order: PurchaseOrderData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(URLS.purchase_order_save, {
      purchase_order: order
    });
  }
}
