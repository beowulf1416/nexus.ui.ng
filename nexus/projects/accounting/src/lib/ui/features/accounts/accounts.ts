import { Component, inject, OnInit, signal } from '@angular/core';
import { AccountDialog } from '../../dialogs/account-dialog/account-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';

import { NotificationService, UserService } from 'core';
import { ACCOUNT_TYPES } from '../../../accounting.constants';
import { AccountItem } from '../../../models/account-item';
import { AccountType } from '../../../models/account-type';
import { AccountCategory } from '../../../models/account-category';
import { AccountingService } from '../../../services/accounting-service';
import { AccountNodeName } from '../../components/account-node-name/account-node-name';

// class Account {
//   constructor(
//     readonly account_id: string,
//     readonly code: string,
//     readonly balance: string,
//     readonly accounts: Array<Account>,
//   ) {}
// }

@Component({
  selector: 'lib-accounts',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    AccountNodeName,
  ],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
})
export class Accounts implements OnInit {
  model = signal({
    accounts: new Array<AccountItem>(),
    account_types: new Array<AccountType>(),
    account_categories: new Array<AccountCategory>(),

    assets: new Array<AccountItem>(),
    liabilities: new Array<AccountItem>(),
    equities: new Array<AccountItem>(),
    expenses: new Array<AccountItem>(),
    incomes: new Array<AccountItem>(),
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

    // accounts
    // this.acct_service.accounts_fetch(
    //   tenant_id
    // ).subscribe({
    //   next: (accounts: Array<AccountItem>) => {
    //     this.model.update((m) => ({
    //       ...m,
    //       accounts: accounts
    //     }));
    //   },
    //   error: (err: any) => {
    //     console.error(err);
    //     this.notification_service.error('Failed to fetch accounts');
    //   }
    // });
    this.fetch_accounts();
  }

  fetch_accounts(): void {
    const tenant_id = this.user_service.current_user().tenant.id;
    // this.acct_service.accounts_fetch(
    //   tenant_id
    // ).subscribe({
    //   next: (accounts: Array<AccountItem>) => {
    //     this.model.update((m) => ({
    //       ...m,
    //       accounts: accounts
    //     }));
    //   },
    //   error: (err: any) => {
    //     console.error(err);
    //     this.notification_service.error('Failed to fetch accounts');
    //   }
    // });

    this.acct_service.accounts_fetch_by_type(ACCOUNT_TYPES.ASSET).subscribe({
      next: (assets: Array<AccountItem>) => {
        this.model.update((m) => ({
          ...m,
          assets: assets
        }));
      },
      error: (err: any) => {
        console.error(err);
        this.notification_service.error('Failed to fetch accounts');
      }
    });

    this.acct_service.accounts_fetch_by_type(ACCOUNT_TYPES.EQUITY).subscribe({
      next: (equities: Array<AccountItem>) => {
        this.model.update((m) => ({
          ...m,
          equities: equities
        }));
      },
      error: (err: any) => {
        console.error(err);
        this.notification_service.error('Failed to fetch accounts');
      }
    });

    this.acct_service.accounts_fetch_by_type(ACCOUNT_TYPES.LIABILITY).subscribe({
      next: (liabilities: Array<AccountItem>) => {
        this.model.update((m) => ({
          ...m,
          liabilities: liabilities
        }));
      },
      error: (err: any) => {
        console.error(err);
        this.notification_service.error('Failed to fetch accounts');
      }
    });

    this.acct_service.accounts_fetch_by_type(ACCOUNT_TYPES.INCOME).subscribe({
      next: (incomes: Array<AccountItem>) => {
        this.model.update((m) => ({
          ...m,
          incomes: incomes
        }));
      },
      error: (err: any) => {
        console.error(err);
        this.notification_service.error('Failed to fetch accounts');
      }
    });

    this.acct_service.accounts_fetch_by_type(ACCOUNT_TYPES.EXPENSE).subscribe({
      next: (expenses: Array<AccountItem>) => {
        this.model.update((m) => ({
          ...m,
          expenses: expenses
        }));
      },
      error: (err: any) => {
        console.error(err);
        this.notification_service.error('Failed to fetch accounts');
      }
    });
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
