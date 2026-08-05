import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiResponse, UomSelector, Uuid } from 'core';
import { ItemSelector } from '../../../components/item-selector/item-selector';
import { ItemData } from '../../../../models/item-data';
import { OrganizationSelector } from 'organization-selector';
import { PartnerSelector } from 'crm';
import { PurchaseOrderService } from '../../../../services/purchase-order-service';


class ItemOrderRow {
  constructor(
    readonly item: ItemData,
    public quantity: number,
    // public dimension_id: string,
    public uom_id: string
  ) { }
}

@Component({
  selector: 'lib-purchase-order',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    FormField,
    // LocationSelector,
    UomSelector,
    ItemSelector,
    OrganizationSelector,
    PartnerSelector,
  ],
  templateUrl: './purchase-order.html',
  styleUrl: './purchase-order.css',
})
export class PurchaseOrder implements OnInit {
  model = signal({
    po_id: '',
    po_date: new Date(),
    version: 0,
    description: '',
    org_id: '',
    partner_id: '',
    items: new Array<ItemOrderRow>(),
  });

  component = {
    form: form(this.model, (f) => {
      required(f.description, { message: 'Description is required' });
    })
  };

  private pos = inject(PurchaseOrderService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() { }

  ngOnInit(): void {
    const po_id = this.route.snapshot.paramMap.get('po_id');
    if (po_id) {
      console.info('//todo');
    } else {
      this.model.update((m) => {
        return {
          ...m,
          po_id: new Uuid().to_string(),
        };
      })
    }
  }

  on_submit(event: Event): void {
    event.preventDefault();

    submit(this.component.form, async () => {
      const model = this.model();


      const po = {
        po_id: model.po_id,
        po_date: model.po_date,
        active: true,
        version: model.version,
        description: model.description,
        org_id: model.org_id,
        partner_id: model.partner_id,
        items: model.items.map((i) => ({
          item_id: i.item.item_id instanceof Uuid ? i.item.item_id.to_string() : i.item.item_id,
          quantity: i.quantity,
          uom_id: Number.parseInt(i.uom_id),
        })),
      };

      this.pos.save(po).subscribe({
        next: (r: ApiResponse) => {
          if (r.success) {
            this.router.navigate(['transactions']);
          }
        },
        error: (e) => {
          console.error(e);
        }
      });

    });
  }

  on_items_selected(items: Array<ItemData>): void {
    const new_items = this.model().items.concat(items.map((r) => new ItemOrderRow(r, 0, '')));
    this.model.update((m) => ({
      ...m,
      items: new_items
    }));
  }
}
