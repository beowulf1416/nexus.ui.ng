import { Component, computed, OnInit, signal, inject } from '@angular/core';
import { FieldContext, form, FormField, ItemFieldContext, required, submit, validate } from '@angular/forms/signals';
import { NotificationService, UserService, Uuid } from 'core';
import { AccountType } from '../../../models/account-type';
import { AccountCategory } from '../../../models/account-category';
import { AccountingService } from '../../../services/accounting-service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { AccountItem } from '../../../models/account-item';
import { AccountSelector } from '../../components/account-selector/account-selector';

@Component({
  selector: 'lib-account-dialog',
  imports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    FormField,
    AccountSelector
  ],
  templateUrl: './account-dialog.html',
  styleUrl: './account-dialog.css',
})
export class AccountDialog implements OnInit {
  model = signal({
    account_id: '',
    code: '',
    name: '',
    description: '',
    type_id: 0,
    category_id: 0
  });

  component = {
    errors: signal(new Array<string>()),
    account_types: signal(new Array<AccountType>()),
    account_categories: signal(new Array<AccountCategory>()),
    form: form(this.model, (f) => {
      required(f.name, { message: 'Name is required' });
      required(f.code, { message: 'Code is required' });
      validate(f.type_id, (ctx: FieldContext<number>) => {
        return ctx.value() > 0 ? null : { kind: 'AccountTypeError', message: 'Type is required' };
      });
      validate(f.category_id, (ctx: FieldContext<number>) => {
        return ctx.value() > 0 ? null : { kind: 'AccountCategoryError', message: 'Category is required' };
      });
    })
  };

  title = computed(() => {
    return this.model().name == '' ? 'New Account' : this.model().name;
  });

  private user_service = inject(UserService)
  private notification_service = inject(NotificationService);
  private accounts_service = inject(AccountingService);
  private dr = inject(MatDialogRef<AccountDialog>);

  constructor() {

  }

  ngOnInit(): void {
    console.info('ngOnInit');

    // account types
    this.accounts_service.account_types_fetch().subscribe({
      next: (r: Array<AccountType>) => {
        this.component.account_types.set(r);
      },
      error: (e: any) => {
        console.error(e);
        this.notification_service.error('Failed to fetch account types');
      }
    });

    // account categories
    this.accounts_service.account_categories_fetch().subscribe({
      next: (r: Array<AccountCategory>) => {
        this.component.account_categories.set(r);
      },
      error: (e: any) => {
        console.error(e);
        this.notification_service.error('Failed to fetch account categories');
      }
    });
  }

  on_cancel(event: Event): void {
    event.preventDefault();
    this.dr.close();
  }

  on_submit(event: Event): void {
    console.info('on_submit');
    event.preventDefault();

    submit(this.component.form, async () => {
      const tenant_id = this.user_service.current_user().tenant.id;
      const model = this.model();

      const account = new AccountItem(new Uuid(model.account_id), model.name, model.code, model.description, model.type_id, model.category_id, 0, new Array<AccountItem>());

      this.accounts_service.account_save(tenant_id, account).subscribe({
        next: (r: any) => {
          this.notification_service.info('Account saved successfully');
          this.dr.close();
        },
        error: (e: any) => {
          console.error(e);
          this.notification_service.error('Failed to save account');
        }
      });
    });
  }
}
