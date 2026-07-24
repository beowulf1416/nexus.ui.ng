import { Component, signal, inject, computed, OnInit } from '@angular/core';
import { form, FormField, required, submit, validate } from '@angular/forms/signals';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { ApiResponse, Uuid, NotificationService, Tenant, Currency, Dimension, Uom } from 'core';
import { AccountingService } from '../../../services/accounting-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Invoice } from '../../../models/invoice';
import { InvoiceType } from '../../../models/invoice-type';
import { InvoiceItem } from '../../../models/invoice-item';
import { Router } from '@angular/router';
import { InvoiceService } from '../../../services/invoice-service';
import { AccountSelector } from '../../components/account-selector/account-selector';
import { OrganizationData, OrganizationSelector } from 'organization-selector';
import { PartnerSelector, PartnerData } from 'crm';
import { AccountData } from '../../../models/account-data';

@Component({
  selector: 'lib-invoice-dialog',
  providers:[provideNativeDateAdapter()],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    FormField,
    AccountSelector,
    OrganizationSelector,
    PartnerSelector
  ],
  templateUrl: './invoice-dialog.html',
  styleUrl: './invoice-dialog.css',
})
export class InvoiceDialog implements OnInit {
  model = signal({
    tenant_id: '',
    invoice_id: '',
    type_id: 0,
    from_party_id: '',
    to_party_id: '',
    invoice_date: new Date(),
    due_date: new Date(),
    description: '',
    currency_id: 0,
    org_id: '',
    partner_id: '',
    account_id: '',
    version: 0
  });

  component = {
    errors: signal(new Array<string>()),
    invoice_types: signal(new Array<InvoiceType>()),
    form: form(this.model, (f) => {
      required(f.type_id, { message: "Please select Invoice Type" });

      required(f.org_id, { message: "Please select an organization" });
      validate(f.org_id, ({ value }) => {
        if (value() == '') {
          return {
            kind: 'org_id',
            message: 'Please select organization'
          }
        }
        return null;
      });

      required(f.partner_id, { message: "Please select a partner" });
      validate(f.partner_id, ({ value }) => {
        if (value() == '') {
          return {
            kind: 'partner_id',
            message: 'Please select partner'
          }
        }
        return null;
      });

      required(f.account_id, { message: "Please select an account" });
      validate(f.account_id, ({ value }) => {
        if (value() == '') {
          return {
            kind: 'acct_id',
            message: 'Please select Account'
          }
        }
        return null;
      });
    }),
  };

  readonly data = inject<{
    tenant_id: string;
    invoice_id: string | null;
  } | null>(MAT_DIALOG_DATA);

  private dr = inject(MatDialogRef<InvoiceDialog>);
  private notification_service = inject(NotificationService);
  private invoice_service = inject(InvoiceService);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    const tenant_id = this.data?.tenant_id || Tenant.default().id.to_string();
    const invoice_id = this.data?.invoice_id || new Uuid().to_string();

    this.model.update((m) => ({
      ...m,
      tenant_id: tenant_id,
      invoice_id: invoice_id,
    }));

    const invoice_types = this.invoice_service.fetch_invoice_types().subscribe({
      next: (types: Array<InvoiceType>) => {
        this.component.invoice_types.set(types);
      },
      error: (e: HttpErrorResponse) => {
        this.component.errors.update((errors) => [...errors, e.message]);
      },
    });
  }

  on_cancel(event: Event): void {
    console.info('on_cancel');
    event.preventDefault();

    this.dr.close();
  }

  on_submit(event: Event): void {
    console.info('on_submit');
    event.preventDefault();

    submit(this.component.form, async () => {
      const model = this.model();

      // const tenant_id = model.tenant_id;
      const invoice_id = model.invoice_id;

      this.invoice_service
        .invoice_save(
          new Invoice(
            invoice_id,
            model.type_id,
            model.version,
            new Date(),
            new Date(),
            model.account_id,
            model.org_id,
            model.partner_id,
            model.due_date,
            model.description,
            new Array<InvoiceItem>()
          ),
        )
        .subscribe({
          next: (r: ApiResponse) => {
            console.debug(r);

            if (r.success) {
              this.dr.close();
              // this.router.navigate(['/accounting/invoices/', invoice_id]);
            }
          },
          error: (e: HttpErrorResponse) => {
            console.error(e);
            this.component.errors.update((errors) => [...errors, e.message]);
            this.notification_service.error(e.message);
          },
        });
    });
  }

  on_org_selected(org: OrganizationData): void {
    this.model.update((m) => ({
      ...m,
      org_id: org.org_id
    }));
  }

  on_partner_selected(partner: PartnerData): void {
    this.model.update((m) => ({
      ...m,
      partner_id: partner.partner_id
    }));
  }

  on_account_selected(account: AccountData): void {
    this.model.update((m) => ({
      ...m,
      acct_id: account.account_id
    }));
  }
}
