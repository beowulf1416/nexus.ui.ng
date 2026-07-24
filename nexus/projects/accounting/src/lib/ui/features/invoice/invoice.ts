import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { ActivatedRoute } from '@angular/router';
import { AccountingService } from '../../../services/accounting-service';

import { ApiResponse, CommonService, Dimension, Uom } from 'core';
import { Invoice as InvoiceModel } from '../../../models/invoice';
import { InvoiceType } from '../../../models/invoice-type';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { InvoiceItem } from '../../../models/invoice-item';
import { MatToolbarModule } from '@angular/material/toolbar';
import { InvoiceService } from '../../../services/invoice-service';
import { InvoiceData } from '../../../models/invoice-data';
import { HttpErrorResponse } from '@angular/common/http';
import { OrganizationSelector } from 'organization-selector';
import { PartnerSelector } from 'crm';
import { AccountSelector } from '../../components/account-selector/account-selector';



@Component({
  selector: 'lib-invoice',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    FormField,
    OrganizationSelector,
    PartnerSelector,
    AccountSelector
  ],
  templateUrl: './invoice.html',
  styleUrl: './invoice.css',
})
export class Invoice implements OnInit {
  model = signal({
    invoice_id: '',
    invoice_type_id: 0,
    version: 0,
    created: new Date(),
    updated: new Date(),
    due_date: new Date(),
    description: '',
    items: new Array<InvoiceItem>(),
    new_item: new InvoiceItem('', '', 1, 0, 1),
    account_id: '',
    org_id: '',
    partner_id: ''
  });

  component = {
    errors: signal(new Array<string>()),
    invoice_types: signal(new Array<InvoiceType>()),
    // dimensions: signal(new Array<Dimension>()),
    // uoms: signal(new Array<Uom>()),
    form: form(this.model, (f) => {}),
  };

  total_per_item = computed(() => {
    return this.model().items.map((item) => item.quantity * item.unit_price);
  });

  total = computed(() => {
    return this.model().items.reduce((acc, item) => acc + item.quantity * item.unit_price, 0);
  });

  new_item_total = computed(() => {
    const item = this.model().new_item;
    return item.quantity * item.unit_price;
  });
  new_item_disabled = computed(() => {
    const item = this.model().new_item;
    return !(item.description !== '' && item.quantity > 0 && item.unit_price > 0);
  });

  private route = inject(ActivatedRoute);
  private invoice_service = inject(InvoiceService);
  private common_service = inject(CommonService);

  constructor() {}

  ngOnInit(): void {
    console.debug('ngOnInit');

    this.invoice_service.fetch_invoice_types().subscribe({
      next: (r: Array<InvoiceType>) => {
        console.debug(r);
        this.component.invoice_types.set(r);
      },
      error: (e) => {
        console.error(e);
      },
    });

    const invoice_id = this.route.snapshot.paramMap.get('invoice_id');
    if (invoice_id) {
      this.invoice_service.invoice_fetch(invoice_id).subscribe({
        next: (r: InvoiceData | null) => {
          console.debug(r);

          this.model.update((m) => ({
            ...m,
            invoice_id: invoice_id,
            invoice_type_id: r?.invoice_type_id ?? 0,
            due_date: r?.due_date ?? new Date(),
            description: r?.description ?? '',
            items: r?.items ?? new Array<InvoiceItem>(),
          }));
        },
        error: (e) => {
          console.error(e);
        },
      });
    }
  }

  on_submit(event: Event): void {
    console.info('on_submit');
    event.preventDefault();

    submit(this.component.form, async () => {
      const model = this.model();

      this.invoice_service.invoice_save(new InvoiceModel(
        model.invoice_id,
        model.invoice_type_id,
        model.version,
        model.created,
        model.updated,
        model.account_id,
        model.org_id,
        model.partner_id,
        model.due_date,
        model.description,
        model.items
      )).subscribe({
        next: (r: ApiResponse) => {
          console.debug(r);
        },
        error: (e: HttpErrorResponse) => {
          console.error(e);
        }
      })
    });
  }

  on_new_invoice_item(event: Event): void {
    console.info('on_new_invoice_item');
    event.preventDefault();

    const new_item = this.model().new_item;
    this.model.update((m) => ({
      ...m,
      items: m.items.concat(
        new InvoiceItem(
          new_item.item_id,
          new_item.description,
          new_item.quantity,
          new_item.unit_price,
          new_item.currency_id,
        ),
      ),
      new_item: new InvoiceItem('', '', 1, 0, 1),
    }));
  }

  on_remove_item(i: number): void {
    this.model.update((m) => ({
      ...m,
      items: m.items.toSpliced(i, 1),
    }));
  }
}
