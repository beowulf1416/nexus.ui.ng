import { Component, computed, inject, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AccountSelectorDialog } from '../../dialogs/account-selector-dialog/account-selector-dialog';
import { UserService } from 'core';

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

  account_selected = output();

  constructor() { }

  show_account_selector_dialog(event: MouseEvent): void {
    console.info('show_account_selector_dialog');
    event.preventDefault();

    const dr = this.md.open(AccountSelectorDialog,{
      position: {
        top: '20px',
        right: '10px',
      },
      data: {  },
    });
    dr.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.model.set(result);
          this.account_selected.emit(result);
        }
      },
    });
  }
}
