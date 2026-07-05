import { Service } from '@angular/core';
import { inject } from '@angular/core/primitives/di';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

import { ApiResponse } from 'core';
import { InvoiceType } from '../models/invoice-type';
import { URLS } from '../accounting.constants';
import { Invoice } from '../models/invoice';

@Service()
export class AccountingService {
  http = inject(HttpClient);

  constructor() {}

  fetch_invoice_types(): Observable<Array<InvoiceType>> {
    return this.http.post<ApiResponse>(`${URLS.base_url}${URLS.fetch_invoice_types}`, {}).pipe(
      map((r: ApiResponse) => {
        if (r.success && r.data) {
          const invoice_types = (
            r.data as {
              invoice_types: Array<InvoiceType>;
            }
          ).invoice_types;
          return invoice_types;
        }
        return new Array<InvoiceType>();
      }),
      catchError((e: any) => {
        console.error(e);
        throw e;
      }),
    );
  }

  invoice_save(invoice: Invoice): Observable<ApiResponse> {
    console.info('invoice_save');

    return this.http.post<ApiResponse>(`${URLS.base_url}${URLS.invoice_save}`, {
      invoice_id: invoice.invoice_id,
      invoice_type_id: invoice.invoice_type_id,
      due_date: invoice.due_date,
      description: invoice.description,
      // currency_id: invoice.currency_id,
      items: invoice.items,
    });
  }
}
