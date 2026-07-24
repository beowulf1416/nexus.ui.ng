import { Component, computed, inject, input, model, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AccountSelectorDialog } from '../../dialogs/account-selector-dialog/account-selector-dialog';
import { UserService, Uuid } from 'core';
import { AccountItem } from '../../../models/account-item';
import { AccountTypeId } from '../../../accounting.constants';
import { AccountData } from '../../../models/account-data';
import { FormValueControl } from '@angular/forms/signals';
import { AccountingService } from '../../../services/accounting-service';
import { AccountNode } from '../../../models/account-node';
import { HttpErrorResponse } from '@angular/common/http';



interface AccountSelected {
  account_id: string;
  name: string;
}

@Component({
  selector: 'account-selector',
  imports: [
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './account-selector.html',
  styleUrl: './account-selector.css',
})
export class AccountSelector implements FormValueControl<string> {
  value = model<string>('');

  model = signal({
    account_id: '',
    name: ''
  });

  title = computed(() => {
    return this.model().name == '' ? 'Select Account' : this.model().name;
  });

  private user_service = inject(UserService);
  private md = inject(MatDialog);
  private acctg_service = inject(AccountingService);

  account_type = input<AccountTypeId>();
  account_selected = output<AccountData>();

  constructor() { }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    this.value.set(input.value);

    if (value) {
      this.acctg_service.account_fetch(new Uuid(value)).subscribe({
        next: (r: AccountNode | null) => {
          if (r) {
            this.model.set({
              account_id: r.account_id.to_string(),
              name: r.name
            })
          }
        },
        error: (e: HttpErrorResponse) => {
          console.error(e.message);
        }
      })
    }
  }

  show_account_selector_dialog(event: MouseEvent): void {
    console.info('show_account_selector_dialog');
    event.preventDefault();

    const dr = this.md.open(AccountSelectorDialog,{
      position: {
        top: '20px',
        right: '10px',
      },
      data: {
        account_type: this.account_type(),
      },
    });
    dr.afterClosed().subscribe({
      next: (result: Array<AccountSelected>) => {
        if (result) {
          const a = {
            account_id: result[0].account_id,
            name: result[0].name
          };
          this.value.set(a.account_id);
          this.model.set(a);
          this.account_selected.emit(a);
        }
      },
    });
  }
}
