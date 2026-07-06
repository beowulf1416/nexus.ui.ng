import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

import { Currency } from '../models/currency';
import { ApiResponse } from '../models/api-response';
import { URLS } from '../constants';
import { Country } from '../models/country';
import { Dimension } from '../models/dimension';
import { Uom } from '../models/uom';

@Service()
export class CommonService {
  http = inject(HttpClient);

  constructor() {}

  fetch_currencies(): Observable<Currency> {
    console.info('fetch_currencies');

    return this.http.post<ApiResponse>(`${URLS.base_url}${URLS.fetch_currencies}`, {}).pipe(
      map((r: ApiResponse) => {
        if (r.success && r.data) {
          const currencies = (
            r.data as {
              currencies: Array<Currency>;
            }
          ).currencies;
          return currencies;
        }
        return new Array<Currency>();
      }),
      catchError((e) => {
        console.error(e);
        throw e;
      }),
    );
  }

  fetch_countries(): Observable<Country> {
    console.info('fetch_countries');

    return this.http.post<ApiResponse>(`${URLS.base_url}${URLS.fetch_countries}`, {}).pipe(
      map((r: ApiResponse) => {
        if (r.success && r.data) {
          const countries = (
            r.data as {
              countries: Array<Country>;
            }
          ).countries;
          return countries;
        }
        return new Array<Country>();
      }),
      catchError((e) => {
        console.error(e);
        throw e;
      }),
    );
  }

  fetch_dimensions(): Observable<Array<Dimension>> {
    console.info('fetch_dimensions');

    return this.http.post<ApiResponse>(`${URLS.base_url}${URLS.fetch_dimensions}`, {}).pipe(
      map((r: ApiResponse) => {
        if (r.success && r.data) {
          const dimensions = (
            r.data as {
              dimensions: Array<Dimension>;
            }
          ).dimensions;
          return dimensions;
        }
        return new Array<Dimension>();
      }),
      catchError((e) => {
        console.error(e);
        throw e;
      }),
    );
  }

  fetch_uoms(): Observable<Array<Uom>> {
    console.info('fetch_uoms');

    return this.http.post<ApiResponse>(`${URLS.base_url}${URLS.fetch_uoms}`, {}).pipe(
      map((r: ApiResponse) => {
        if (r.success && r.data) {
          const uoms = (
            r.data as {
              uoms: Array<Uom>;
            }
          ).uoms;
          return uoms;
        }
        return new Array<Uom>();
      }),
      catchError((e) => {
        console.error(e);
        throw e;
      }),
    );
  }

  fetch_uoms_by_dimension(dimension_id: string): Observable<Uom> {
    console.info('fetch_uoms_by_dimension');

    return this.http
      .post<ApiResponse>(`${URLS.base_url}${URLS.fetch_uoms_by_dimension}`, {
        dimension_id: dimension_id,
      })
      .pipe(
        map((r: ApiResponse) => {
          if (r.success && r.data) {
            const uom = (
              r.data as {
                uom: Uom;
              }
            ).uom;
            return uom;
          }
          // return new Uom(0, '');
          throw new Error('No data');
        }),
        catchError((e) => {
          console.error(e);
          throw e;
        }),
      );
  }
}
