import { Service } from '@angular/core';
import { inject } from '@angular/core/primitives/di';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';

import { ApiResponse, Uuid } from 'core';
import { InvoiceType } from '../models/invoice-type';
import { URLS } from '../accounting.constants';
import { Invoice } from '../models/invoice';
import { AccountItem } from '../models/account-item';
import { AccountType } from '../models/account-type';
import { AccountCategory } from '../models/account-category';

@Service()
export class AccountingService {
  http = inject(HttpClient);

  constructor() {}

  account_types_fetch(): Observable<Array<AccountType>> {
    return this.http.post<ApiResponse>(`${URLS.base_url}${URLS.account_types_fetch}`, {}).pipe(
      map((r: ApiResponse) => {
        if (r.success && r.data) {
          const types = (
            r.data as {
              account_types: Array<AccountType>;
            }
          ).account_types;
          return types;
        }
        return new Array<AccountType>();
      }),
      catchError((e: any) => {
        console.error(e);
        throw e;
      }),
    );
  }

  account_categories_fetch(): Observable<Array<AccountCategory>> {
    return this.http.post<ApiResponse>(`${URLS.base_url}${URLS.account_categories_fetch}`, {}).pipe(
      map((r: ApiResponse) => {
        if (r.success && r.data) {
          const categories = (
            r.data as {
              account_categories: Array<AccountCategory>;
            }
          ).account_categories;
          return categories;
        }
        return new Array<AccountCategory>();
      }),
      catchError((e: any) => {
        console.error(e);
        throw e;
      }),
    );
  }

  accounts_fetch(tenant_id: Uuid): Observable<Array<AccountItem>> {
    return this.http.post<ApiResponse>(`${URLS.base_url}${URLS.accounts_fetch_all}`, {
      tenant_id: tenant_id,
    }).pipe(
      map((r: ApiResponse) => {
        if (r.success && r.data) {
          const accounts = (
            r.data as {
              accounts: Array<AccountItem>;
            }
          ).accounts;
          return accounts;
        }
        return new Array<AccountItem>();
      }),
      catchError((e: any) => {
        console.error(e);
        throw e;
      }),
    );
  }

  account_save(tenant_id: Uuid, account: AccountItem): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${URLS.base_url}${URLS.account_save}`, {
      tenant_id: tenant_id.to_string(),
      account: account,
    });
  }
}
