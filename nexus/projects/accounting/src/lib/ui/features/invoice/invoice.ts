import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { ActivatedRoute } from '@angular/router';
import { AccountingService } from '../../../services/accounting-service';

import { CommonService, Dimension, Uom } from 'core';
import { Invoice as InvoiceModel } from '../../../models/invoice';
import { InvoiceType } from '../../../models/invoice-type';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { InvoiceItem } from '../../../models/invoice-item';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'lib-invoice',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    FormField,
  ],
  templateUrl: './invoice.html',
  styleUrl: './invoice.css',
})
export class Invoice implements OnInit {
  model = signal({
    invoice_id: '',
    invoice_type_id: 0,
    due_date: new Date(),
    description: '',
    items: new Array<InvoiceItem>(),
    new_item: new InvoiceItem('', '', 1, 0, 1),
  });

  component = {
    errors: signal(new Array<string>()),
    invoice_types: signal(new Array<InvoiceType>()),
    // dimensions: signal(new Array<Dimension>()),
    // uoms: signal(new Array<Uom>()),
    form: form(this.model, (f) => {}),
  };

  new_item_total = computed(() => {
    const item = this.model().new_item;
    return item.quantity * item.unit_price;
  });
  new_item_disabled = computed(() => {
    const item = this.model().new_item;
    return !(item.description !== '' && item.quantity > 0 && item.unit_price > 0);
  });

  private route = inject(ActivatedRoute);
  private acctg_service = inject(AccountingService);
  private common_service = inject(CommonService);

  constructor() {}

  ngOnInit(): void {
    console.debug('ngOnInit');

    this.acctg_service.fetch_invoice_types().subscribe({
      next: (r: Array<InvoiceType>) => {
        console.debug(r);
        this.component.invoice_types.set(r);
      },
      error: (e) => {
        console.error(e);
      },
    });

    // this.common_service.fetch_dimensions().subscribe({
    //   next: (r: Array<Dimension>) => {
    //     // console.debug(r);
    //     this.component.dimensions.set(r);
    //   },
    //   error: (e) => {
    //     console.error(e);
    //   },
    // });

    // this.common_service.fetch_uoms().subscribe({
    //   next: (r: Array<Uom>) => {
    //     // console.debug(r);
    //     this.component.uoms.set(r);
    //   },
    //   error: (e) => {
    //     console.error(e);
    //   },
    // });

    const invoice_id = this.route.snapshot.paramMap.get('invoice_id');
    if (invoice_id) {
      this.acctg_service.invoice_fetch(invoice_id).subscribe({
        next: (r: InvoiceModel | null) => {
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
  }
}
