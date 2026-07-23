import { Service } from '@angular/core';
import { inject } from '@angular/core/primitives/di';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';

import { ApiResponse } from 'core';
import { InvoiceType } from '../models/invoice-type';
import { URLS } from '../accounting.constants';
import { Invoice } from '../models/invoice';
import { InvoiceData } from '../models/invoice-data';

@Service()
export class InvoiceService {
  http = inject(HttpClient);

  constructor() {}

  fetch_invoice_types(): Observable<Array<InvoiceType>> {
    return this.http.post<ApiResponse>(URLS.fetch_invoice_types, {}).pipe(
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

  invoices_fetch(filter: string): Observable<Array<InvoiceData>> {
    console.info('invoices_fetch');

    return this.http
      .post<ApiResponse>(URLS.invoices_fetch, {
        filter: filter,
      })
      .pipe(
        map((r: ApiResponse) => {
          if (r.success && r.data) {
            const invoices = (
              r.data as {
                invoices: Array<InvoiceData>;
              }
            ).invoices;
            return invoices;
          }
          return new Array<InvoiceData>();
        }),
        catchError((e: any) => {
          console.error(e);
          throw e;
        }),
      );
  }

  invoice_fetch(invoice_id: string): Observable<InvoiceData | null> {
    console.info('invoice_fetch');

    return this.http
      .post<ApiResponse>(URLS.invoice_fetch, {
        invoice_id: invoice_id,
      })
      .pipe(
        map((r: ApiResponse) => {
          if (r.success && r.data) {
            const invoice = (
              r.data as {
                invoice: InvoiceData;
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

    return this.http.post<ApiResponse>(URLS.invoice_save, {
      invoice_id: invoice.invoice_id,
      invoice_type_id: invoice.invoice_type_id,
      due_date: invoice.due_date,
      description: invoice.description,
      version: invoice.version,
      items: invoice.items,
    });
  }
}
