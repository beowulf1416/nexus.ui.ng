import { Component, signal, computed, inject } from '@angular/core';
import { form, FormField, required, submit, FieldTree } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';

import { ApiResponse, Uuid, NotificationService, UserService } from 'core';
import { InvoiceDialog } from '../../dialogs/invoice-dialog/invoice-dialog';
import { AccountingService } from '../../../services/accounting-service';
import { Invoice } from '../../../models/invoice';
import { RouterLink } from '@angular/router';

class InvoiceRow {
  constructor(
    readonly invoice: Invoice,
    public selected: boolean = false,
  ) {}
}

@Component({
  selector: 'lib-invoices',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    FormField,
    RouterLink,
  ],
  templateUrl: './invoices.html',
  styleUrl: './invoices.css',
})
export class Invoices {
  model = signal({
    tenant_id: '',
    filter: '',
    invoices: Array<InvoiceRow>(),
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {}),
  };

  active_disabled = computed(() => {
    return this.model().invoices.filter((t) => t.selected).length < 1;
  });
  reset_disabled = computed(() => {
    return this.model().filter.length < 1;
  });

  md = inject(MatDialog);
  user_service = inject(UserService);
  notification_service = inject(NotificationService);
  acctg_service = inject(AccountingService);

  current_tenant = computed(() => this.user_service.current_user().tenant);

  constructor() {}

  on_filter(event: Event): void {
    console.info('on_filter');
    event.preventDefault();

    const filter = this.model().filter;
    this.acctg_service.invoices_fetch(filter).subscribe({
      next: (invoices: Array<Invoice>) => {
        console.debug(invoices);
        this.model.update((m) => ({
          ...m,
          invoices: invoices.map((i) => new InvoiceRow(i)),
        }));
      },
      error: (e) => {
        this.component.errors.update((errors) => [...errors, e]);
        this.notification_service.error(e.message);
      },
    });
  }

  on_reset_filter(event: Event): void {
    console.info('on_reset_filter');
    event.preventDefault();
  }

  on_refresh(event: Event): void {
    console.info('on_refresh');
    event.preventDefault();
  }

  on_select_all(event: Event): void {
    console.info('on_select_all');
    event.preventDefault();
  }

  on_edit_invoice(event: Event, index: number): void {
    console.info('on_edit_invoice');
    event.preventDefault();
  }

  new_invoice_dialog(event: Event): void {
    console.info('new_invoice_dialog');
    event.preventDefault();

    const tenant_id = this.current_tenant().id;
    const dialog_ref = this.md.open(InvoiceDialog, {
      position: {
        top: '20px',
        right: '10px',
      },
      data: {
        tenant_id: tenant_id,
        invoice_id: null,
      },
    });
    dialog_ref.afterClosed().subscribe({
      next: (result: any) => {
        console.debug(result);
      },
      error: (e: any) => {
        console.error(e);
        this.notification_service.error(e);
      },
    });
  }
}
