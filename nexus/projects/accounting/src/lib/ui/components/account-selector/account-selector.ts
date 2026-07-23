import { Component, computed, inject, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AccountSelectorDialog } from '../../dialogs/account-selector-dialog/account-selector-dialog';
import { UserService, Uuid } from 'core';
import { AccountItem } from '../../../models/account-item';
import { AccountTypeId } from '../../../accounting.constants';
import { AccountData } from '../../../models/account-data';



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
export class AccountSelector {

  model = signal({
    account_id: '',
    name: ''
  });

  title = computed(() => {
    return this.model().name == '' ? 'Select Account' : this.model().name;
  });

  private user_service = inject(UserService);
  private md = inject(MatDialog);

  account_type = input<AccountTypeId>();
  account_selected = output<AccountData>();

  constructor() { }

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
          this.model.set(a);
          this.account_selected.emit(a);
        }
      },
    });
  }
}
