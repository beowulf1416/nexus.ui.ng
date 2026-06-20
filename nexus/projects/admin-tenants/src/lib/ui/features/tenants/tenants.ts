import { Component, signal, computed } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { form, FormField, required, submit, FieldTree } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { Header, ApiResponse, Uuid } from 'core';
import { TenantsService } from '../../../services/tenants-service';
import { TenantDialog } from '../../dialogs/tenant-dialog/tenant-dialog';
import { TenantItem } from '../../../models/tenant-item';
import { HTTP_STATUS } from 'core';



class TenantItemRow {
  constructor(
    readonly tenant: TenantItem,
    readonly selected: boolean = false
  ){}
}

@Component({
  selector: 'lib-tenants',
  imports: [
    CommonModule,
    Header,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    FormField
  ],
  templateUrl: './tenants.html',
  styleUrl: './tenants.css',
})
export class Tenants {

  model = signal({
    filter: '',
    tenants: new Array<TenantItemRow>()
  });

  active_disabled = computed(() => {
    return this.model().tenants.filter((t) => t.selected).length < 1;
  });
  reset_disabled = computed(() => {
    return this.model().filter.length < 1;
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      required(f.filter, { message: 'Filter is required' });
    }),
    // tenants: signal(new Array<TenantItem>())
  };

  constructor(
    private tenant_service: TenantsService,
    private md: MatDialog
  ) {

  }

  show_tenant_dialog(event: Event) {
    let dr = this.md.open(TenantDialog, {
      position: {
        right: '10px'
      }
    })
    dr.afterClosed().subscribe((result: any) => {
      console.debug(result);
    });
  }

  on_reset_filter(event: Event): void {
    event.preventDefault();
    this.model.update((m) => ({
      ...m,
      filter: ''
    }));
    this.fetch_tenants(event);
  }

  on_refresh(event: Event): void {
    this.fetch_tenants(event);
  }

  fetch_tenants(event: Event): void {
    console.log('fetch_tenants');

    event.preventDefault();

    this.tenant_service.fetch_tenants(
      this.model().filter
    ).subscribe({
      next: (tenants: Array<TenantItem>) => {
        console.debug(tenants);

        let tenant_rows = tenants.map((tenant) =>
          new TenantItemRow(
            tenant,
            false
          )
        );

        this.model.update((m) => ({
          ...m,
          tenants: tenant_rows
        }));

      },
      error: (err: Error) => {
        if (err instanceof HttpErrorResponse) {
          let code = err.status;
          if (code == HTTP_STATUS.FORBIDDEN) {
            this.component.errors.update((errors: Array<string>) => {
              errors.push('You do not have permission to access this resource.');
              return errors;
            });
          }
        }
      },
    });
  }

  on_select_all(event: Event): void {
    console.info('on_select_all');
    event.preventDefault();
  }

  on_select_item(event: Event): void {
    console.info('on_select_item');
  }

  on_edit_tenant(event: Event, index: number): void {
    console.info('on_edit_tenant');
    console.debug(index);

    let tr = this.model().tenants[index];

    let dr = this.md.open(TenantDialog, {
      position: {
        right: '10px'
      },
      data: { id: new Uuid(tr.tenant.id) }
    })
    dr.afterClosed().subscribe((result: any) => {
      console.debug(result);
    });
  }

  on_set_active(event: Event, active: boolean): void {
    console.info('on_set_active');
    event.preventDefault();

    let model = this.model();
    console.debug(model);

    // collect selected tenants
    const tenant_ids = model.tenants
      .filter((tr: TenantItemRow) => tr.selected)
      .map((tr: TenantItemRow) => new Uuid(tr.tenant.id));

    this.tenant_service.set_active(
      tenant_ids,
      active
    ).subscribe({
      next: (result: ApiResponse) => {
        console.debug(result);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      },
    });
  }
}
