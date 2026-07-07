import { Service } from '@angular/core';
import { inject } from '@angular/core/primitives/di';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';

import { ApiResponse } from 'core';
import { InvoiceType } from '../models/invoice-type';
import { URLS } from '../accounting.constants';
import { Invoice } from '../models/invoice';

@Service()
export class AccountingService {
  http = inject(HttpClient);

  constructor() {}

  // chart_of_accounts_fetch(): void {
  //   return this.http.post<ApiResponse>(`${URLS.base_url}${URLS.chart_of_accounts_fetch}`, {}).pipe(
  //     tap(r: ApiResponse) => {
  //       console.debug(r);
  //     }
  //   );
  // }

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

  invoices_fetch(filter: string): Observable<Array<Invoice>> {
    console.info('invoices_fetch');

    return this.http
      .post<ApiResponse>(`${URLS.base_url}${URLS.invoices_fetch}`, {
        filter: filter,
      })
      .pipe(
        map((r: ApiResponse) => {
          if (r.success && r.data) {
            const invoices = (
              r.data as {
                invoices: Array<Invoice>;
              }
            ).invoices;
            return invoices;
          }
          return new Array<Invoice>();
        }),
        catchError((e: any) => {
          console.error(e);
          throw e;
        }),
      );
  }

  invoice_fetch(invoice_id: string): Observable<Invoice | null> {
    console.info('invoice_fetch');

    return this.http
      .post<ApiResponse>(`${URLS.base_url}${URLS.invoice_fetch}`, {
        invoice_id: invoice_id,
      })
      .pipe(
        map((r: ApiResponse) => {
          if (r.success && r.data) {
            const invoice = (
              r.data as {
                invoice: Invoice;
              }
            ).invoice;
            return invoice;
          }
          return null;
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
