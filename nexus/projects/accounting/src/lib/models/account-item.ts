export class AccountItem {
  constructor(
    readonly name: string,
    readonly code: string,
    readonly description: string,
    readonly balance: string,
    readonly child_accounts: Array<AccountItem>,
  ) {}
}
