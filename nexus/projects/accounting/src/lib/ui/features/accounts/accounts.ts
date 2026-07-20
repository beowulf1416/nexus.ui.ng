import { Component, inject, OnInit, signal } from '@angular/core';
import { AccountDialog } from '../../dialogs/account-dialog/account-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';

import { NotificationService, UserService, Uuid } from 'core';
import { ACCOUNT_TYPES } from '../../../accounting.constants';
// import { AccountItem } from '../../../models/account-item';
import { AccountType } from '../../../models/account-type';
import { AccountCategory } from '../../../models/account-category';
import { AccountingService } from '../../../services/accounting-service';
import { AccountNode } from '../../../models/account-node';



class AccountRow {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly code: string,
    readonly balance: number,
    readonly level: number,
  ) {}
}

@Component({
  selector: 'lib-accounts',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
})
export class Accounts implements OnInit {
  model = signal({
    accounts: new Array<AccountNode>(),
    rows: new Array<AccountRow>(),
    account_types: new Array<AccountType>(),
    account_categories: new Array<AccountCategory>(),

    // assets: new Array<AccountItem>(),
    // liabilities: new Array<AccountItem>(),
    // equities: new Array<AccountItem>(),
    // expenses: new Array<AccountItem>(),
    // incomes: new Array<AccountItem>(),
  });

  private acct_service = inject(AccountingService);
  private notification_service = inject(NotificationService);
  private user_service = inject(UserService);
  private md = inject(MatDialog);

  constructor() {}

  ngOnInit(): void {
    const user = this.user_service.current_user();
    if (!user) {
      // todo
      return;
    }

    const tenant_id = user.tenant.id;
    console.debug(tenant_id);

    // account types
    this.acct_service.account_types_fetch().subscribe({
      next: (types: Array<AccountType>) => {
        this.model.update((m) => ({
          ...m,
          account_types: types
        }));
      },
      error: (err: any) => {
        console.error(err);
        this.notification_service.error('Failed to fetch account types');
      }
    });

    // account categories
    this.acct_service.account_categories_fetch().subscribe({
      next: (categories: Array<AccountCategory>) => {
        this.model.update((m) => ({
          ...m,
          account_categories: categories
        }));
      },
      error: (err: any) => {
        console.error(err);
        this.notification_service.error('Failed to fetch account categories');
      }
    });

    this.fetch_accounts();
  }

  fetch_accounts(): void {
    const tenant_id = this.user_service.current_user().tenant.id;

    this.acct_service.accounts_fetch_tree().subscribe({
      next: (accounts: Array<AccountNode>) => {

        const rows = this.flatten_nodes(accounts);

        this.model.update((m) => ({
          ...m,
          accounts: accounts,
          rows: rows,
        }));
      },
      error: (err: any) => {
        console.error(err);
        this.notification_service.error('Failed to fetch accounts');
      }
    });
  }

  flatten_nodes(nodes: AccountNode[]): AccountRow[] {
    let rows: AccountRow[] = [];

    function visit_node(node: AccountNode, level: number): void {
      const account_id = node.account_id instanceof Uuid ? node.account_id.to_string() : node.account_id;
      rows.push(new AccountRow(
        account_id,
        node.name,
        node.code,
        node.balance,
        level,
      ));

      node.children.forEach(child => visit_node(child, level + 1));
    }

    nodes.forEach(node => visit_node(node, 0));
    return rows;
  }

  on_refresh(event: Event): void {
    console.info('on_refresh');
    event.preventDefault();
    this.fetch_accounts();
  }

  on_new_account(event: Event): void {
    console.info('on_new_account');

    const dr = this.md.open(AccountDialog, {
      position: {
        top: '20px',
        right: '10px',
      },
      data: {  }
    });
  }
}
