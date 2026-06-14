import { Component, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { Header, ApiResponse } from 'core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { TenantsService } from '../../../services/tenants-service';
import { TenantDialog } from '../../dialogs/tenant-dialog/tenant-dialog';
import { TenantItem } from '../../../models/tenant-item';
import { HTTP_STATUS } from 'core';


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
    filter: ''
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      required(f.filter, { message: 'Filter is required' });
    })
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
    this.model.update((m: { filter: string }) => {
      m.filter = '';
      return m;
    });
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
      },
      error: (err: Error) => {
        console.debug(err);
        console.debug(typeof err);
        console.debug(err.message);

        if (err instanceof HttpErrorResponse) {
          let code = err.status;
          if (code == HTTP_STATUS.FORBIDDEN) {
            console.debug('Forbidden');
            // let errors = this.component.errors();
            // errors.push('Forbidden');
            this.component.errors.update((errors: Array<string>) => {
              console.debug(errors);
              errors.push('Forbidden');
              return errors;
            });
          }
        }
      },
    });
  }

}
