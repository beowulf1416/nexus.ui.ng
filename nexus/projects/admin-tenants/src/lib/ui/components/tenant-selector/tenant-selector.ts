import { Component, input, output, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { TenantsService } from '../../../services/tenants-service';
import { TenantSelectionDialog } from '../../dialogs/tenant-selection-dialog/tenant-selection-dialog';
import { TenantItem } from '../../../models/tenant-item';


@Component({
  selector: 'tenant-selector',
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './tenant-selector.html',
  styleUrl: './tenant-selector.css',
})
export class TenantSelector {

  multiple = input(true);
  selected_tenants = output<Array<TenantItem>>();

  selected_tenant = signal(new Array<TenantItem>());
  title = computed(() => {
    switch (this.selected_tenant().length) {
      case 0: {
        return this.multiple() ? 'Select Tenants' : 'Select Tenant';
      }
      case 1: {
        return this.selected_tenant()[0].name;
      }
      default: {
        return this.selected_tenant().length + ' tenants selected';
      }
    }
  });

  constructor(
    private tenant_service: TenantsService,
    private md: MatDialog
  ) {}

  on_select_tenant($event: Event): void {
    console.info('on_select_tenant');

    let dr = this.md.open(
      TenantSelectionDialog,
      {
        position: {
          right: '10px'
        },
        data: {
          multiple: this.multiple()
        }
      }
    );
    dr.afterClosed().subscribe((result: Array<TenantItem> | null) => {
      if (result && result.length > 0) {
        this.selected_tenant.set(result);
        this.selected_tenants.emit(result);
      }
    });

  }
}
