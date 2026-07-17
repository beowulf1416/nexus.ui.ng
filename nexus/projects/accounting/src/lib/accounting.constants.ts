import { BASE_URL } from "core";

export const URLS = {
  // base_url: 'http://localhost:8080',

  account_types_fetch: `${BASE_URL}/acctg/accounts/types/fetch`,
  account_categories_fetch: `${BASE_URL}/acctg/accounts/categories/fetch`,
  accounts_fetch_all: `${BASE_URL}/acctg/accounts/fetch/all`,
  accounts_fetch_by_type: `${BASE_URL}/acctg/accounts/fetch/by/type`,
  accounts_fetch_filtered: `${BASE_URL}/acctg/accounts/fetch`,
  account_save: `${BASE_URL}/acctg/accounts/account/save`,
  account_fetch: `${BASE_URL}/acctg/accounts/account/fetch`,

  fetch_invoice_types: `${BASE_URL}/acctg/invoices/types/fetch`,
  invoices_fetch: `${BASE_URL}/acctg/invoices/fetch`,
  invoice_fetch: `${BASE_URL}/acctg/invoices/fetch/id`,
  invoice_save: `${BASE_URL}/acctg/invoices/save`,
};

export type AccountTypeId = number;

export enum ACCOUNT_TYPES {
  ASSET = 1,
  LIABILITY = 2,
  EQUITY = 3,
  EXPENSE = 4,
  INCOME = 5,
}
