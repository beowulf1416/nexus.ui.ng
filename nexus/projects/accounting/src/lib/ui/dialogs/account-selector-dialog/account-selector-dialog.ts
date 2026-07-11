import { Component, signal, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AccountItem } from '../../../models/account-item';
import { AccountingService } from '../../../services/accounting-service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService, UserService } from 'core';


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
    selected: '',
    matches: new Array<AccountItemRow>()
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      required(f.filter, { message: 'Filter is required' })
    })
  };


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

  }

  on_cancel(event: Event): void {
    console.info('on_cancel');
    event.preventDefault();
    this.dr.close();
  }
}
