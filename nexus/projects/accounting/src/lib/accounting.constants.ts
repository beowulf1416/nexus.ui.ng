export const URLS = {
  base_url: 'http://localhost:8080',

  account_types_fetch: '/acctg/accounts/types/fetch',
  account_categories_fetch: '/acctg/accounts/categories/fetch',
  accounts_fetch_all: '/acctg/accounts/fetch/all',
  accounts_fetch_by_type: '/acctg/accounts/fetch/by/type',
  accounts_fetch_filtered: '/acctg/accounts/fetch',
  account_save: 'acctg/accounts/save',

  fetch_invoice_types: '/acctg/invoices/types/fetch',
  invoices_fetch: '/acctg/invoices/fetch',
  invoice_fetch: '/acctg/invoices/fetch/id',
  invoice_save: '/acctg/invoices/save',
};

export type AccountTypeId = number;

export enum ACCOUNT_TYPES {
  ASSET = 1,
  LIABILITY = 2,
  EQUITY = 3,
  EXPENSE = 4,
  INCOME = 5,
}
