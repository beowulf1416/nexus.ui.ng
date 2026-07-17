import { Uuid } from "core";

export class AccountItem {
  constructor(
    readonly account_id: Uuid,
    readonly active: boolean,
    readonly name: string,
    readonly code: string,
    readonly description: string,
    readonly account_type_id: number,
    readonly account_category_id: number,
    readonly balance: number,
    readonly child_accounts: Array<AccountItem>,
  ) {}
}
