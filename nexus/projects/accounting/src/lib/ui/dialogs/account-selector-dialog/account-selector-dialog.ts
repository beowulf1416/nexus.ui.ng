import { Component, signal, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AccountItem } from '../../../models/account-item';
import { AccountingService } from '../../../services/accounting-service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService, UserService } from 'core';
import { AccountTypeId } from '../../../accounting.constants';


class AccountItemRow {
  constructor(
    readonly account: AccountItem,
    public selected: boolean
  ) { }
}

@Component({
  selector: 'lib-account-selector-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatDialogModule,
    FormField
  ],
  templateUrl: './account-selector-dialog.html',
  styleUrl: './account-selector-dialog.css',
})
export class AccountSelectorDialog {
  model = signal({
    filter: '',
    selected: new Array<AccountItemRow>(),
    matches: new Array<AccountItemRow>()
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      required(f.filter, { message: 'Filter is required' })
    })
  };

  readonly data = inject<{
    account_type: AccountTypeId;
  } | null>(MAT_DIALOG_DATA);

  private dr = inject(MatDialogRef<AccountSelectorDialog>);
  private acctg_service = inject(AccountingService);
  private notification_service = inject(NotificationService);
  private user_service = inject(UserService);

  constructor() {

  }

  on_submit(event: Event): void {
    console.info('on_submit');
    event.preventDefault();

    submit(this.component.form, async () => {
      const model = this.model();
      const filter = model.filter;
      const tenant_id = this.user_service.current_user().tenant.id;

      this.acctg_service.accounts_fetch_filtered(tenant_id, filter).subscribe({
        next: (r: Array<AccountItem>) => {
          this.model.update((m) => ({
            ...m,
            matches: r.map((a: AccountItem) => {
              return new AccountItemRow(
                a,
                false
              );
            })
          }));
        },
        error: (e: HttpErrorResponse) => {
          console.error(e);
          this.component.errors.update((errors) => [...errors, e.message]);
          this.notification_service.error(e.message);
        }
      });
    });
  }

  on_clear(event: Event): void {
    console.info('on_clear');
    event.preventDefault();

    this.model.update((m) => ({ ...m, filter: '' }));
  }

  on_cancel(event: Event): void {
    console.info('on_cancel');
    event.preventDefault();
    this.dr.close();
  }

  on_select_item(event: Event, i: number): void {
    console.info('on_select_item');
    event.preventDefault();

    const model = this.model();
    const selected_item = model.matches[i];

    const selected_items = model.selected.concat(selected_item);
    const matched_items = model.matches.toSpliced(i, 1);

    this.model.update((m) => ({ ...m, selected: selected_items, matches: matched_items }));
  }

  on_remove_item(event: Event, i: number): void {
    console.info('on_remove_item');
    event.preventDefault();

    const model = this.model();
    const selected_item = model.selected[i];

    const selected_items = model.selected.toSpliced(i, 1);
    const matched_items = model.matches.concat(selected_item);

    this.model.update((m) => ({ ...m, selected: selected_items, matches: matched_items }));
  }

  on_select(event: Event): void {
    console.info('on_select');
    event.preventDefault();

    const selected_items = this.model().selected;
    this.dr.close(selected_items);
  }
}
