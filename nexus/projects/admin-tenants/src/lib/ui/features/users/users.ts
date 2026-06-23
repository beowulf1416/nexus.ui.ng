import { Component, signal, computed, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { form, required, FormField } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Uuid, NotificationService } from 'core';
import { UsersService } from '../../../services/users-service';
import { TenantItem } from '../../../models/tenant-item';
import { TenantSelector } from '../../../ui/components/tenant-selector/tenant-selector';
import { UserItem } from '../../../models/user-item';


class UserItemRow {
  constructor(
    readonly user: UserItem,
    readonly selected: boolean
  ) {}
}


@Component({
  selector: 'lib-users',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    FormField,
    TenantSelector
  ],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {

  users_service = inject(UsersService);

  model = signal({
    filter: '',
    tenant: TenantItem.default(),
    users: Array<UserItemRow>()
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {

    })
  };

  tenant_selected = computed(() => {
    return this.model().tenant.id != '';
  });

  users_selected = computed(() => {
    return this.model().users.some((u) => u.selected);
  });

  is_filter_empty = computed(() => {
    return this.model().filter == '';
  });

  constructor(
    private notification_service: NotificationService
  ) {}

  fetch_users(): void {
    console.info('fetch_users');

    const { filter, tenant, } = this.model();


    this.users_service.fetch_users(
      new Uuid(tenant.id),
      filter
    ).subscribe({
      next: (users: Array<UserItem>) => {
        this.model.update((m) => ({
          ...m,
          users: users.map((u) => new UserItemRow(u, false))
        }));
      },
      error: (e: HttpErrorResponse) => {
        console.error(e);
        this.notification_service.error(e.message);
      }
    });
  }

  on_tenants_selected(tenants: TenantItem[]): void {
    if (tenants && tenants.length > 0) {
      this.model.update((m) => {
        m.tenant = tenants[0];
        return m;
      });
    }
    this.fetch_users();
  }

  on_set_active(event: Event, active: boolean): void {
    console.info('on_set_active');

    event.preventDefault();
  }

  on_select_all(event: Event): void {
    console.info('on_select_all');

    event.preventDefault();
  }

  on_assign_roles(event: Event): void {
    console.info('on_assign_roles');

    event.preventDefault();
  }

  on_revoke_roles(event: Event): void {
    console.info('on_revoke_roles');

    event.preventDefault();
  }

  on_search(event: Event): void {
    console.info('on_search');

    event.preventDefault();
    this.fetch_users();
  }

  on_clear(event: Event): void {
    console.info('on_clear');

    event.preventDefault();
    this.model.update((m) => {
      m.filter = '';
      return m;
    });
    this.fetch_users();
  }

  on_refresh(event: Event): void {
    console.info('on_refresh');

    event.preventDefault();
    this.fetch_users();
  }

  on_new_user(event: Event): void {
    console.info('on_new_user');

    event.preventDefault();
  }

  on_edit_user(event: Event, i: number): void {
    console.info('on_edit_user');

    event.preventDefault();

  }
}
