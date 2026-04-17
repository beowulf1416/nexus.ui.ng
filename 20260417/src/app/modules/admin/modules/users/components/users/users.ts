import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TenantSelectorModule } from '../../../../../tenant-selector/tenant-selector-module';
import { TenantSelector } from '../../../../../tenant-selector/components/tenant-selector/tenant-selector';
import { User } from '../../classes/user';
import { UsersService } from '../../services/users-service';
import { ApiResponse } from '../../../../../../classes/api-response';
import { Tenant } from '../../../../../tenant-selector/classes/tenant';


@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSidenavModule,
    RouterModule,
    TenantSelectorModule,
    TenantSelector
  ],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {

  @ViewChild('nav_tenant_selector') nav_tenant_selector!: MatSidenav

  component = {
    error: '',
    formUsers: new FormGroup({
      filters: new FormGroup({
        filter: new FormControl('', [])
      }),
      users: new FormArray([])
    })
  };


  constructor(
    private us: UsersService,
    private cd: ChangeDetectorRef
  ) {}


  get users() {
    return this.component.formUsers.get('users') as FormArray;
  }

  refresh(): void {
    console.info('refresh');
    this.search();
  }

  search(): void {
    console.info('search');

    const filter = this.component.formUsers.get('filters.filter')?.value || '';
    this.us.users_search(
      filter
    ).subscribe({
      next: (r: ApiResponse) => {
        if (r.success) {
          let users = (r.data as {
            users: Array<User>
          }).users;

          let ufa = this.component.formUsers.get('users') as FormArray;
          ufa.clear();
          users.forEach((u: User, i: number) => {
            ufa.push(new FormGroup({
              selected: new FormControl(false, []),
              id: new FormControl(u.user_id, []),
              email: new FormControl(u.email, [])
            }));
          });
          this.cd.detectChanges();
        } else {
          console.error('//todo', r);
        }
      },
      error: (e) => {
        console.error('//todo', e);
      },
      complete: () => {
        console.info('//todo: complete');
      }
    });
  }

  assign(): void {
    console.info('assign');
    this.nav_tenant_selector?.close();
  }

  assign_to_tenant(): void {
    console.info('assign_to_tenant');
    this.nav_tenant_selector?.open();
  }

  set_active(): void {
    console.info('set_active');

    let user_ids = (this.component.formUsers.get('users') as FormArray)?.controls
      .filter(c => (c as FormGroup).get('selected')?.value === true)
      .map(c => c.value)
      .map(c => c.id)
    ;

    this.us.users_set_active(
      user_ids,
      true
    ).subscribe({
      next: (r: ApiResponse) => {
        if (r.success) {
          console.info('//todo next');
        } else {
          console.error('//todo', r.message);
        }
      },
      error: (e) => {
        console.error('//todo', e);
      },
      complete: () => {
        this.refresh();
      }
    });
  }

  set_inactive(): void {
    console.info('set_inactive');

    let user_ids = (this.component.formUsers.get('users') as FormArray)?.controls
      .filter(c => (c as FormGroup).get('selected')?.value === true)
      .map(c => c.value)
      .map(c => c.Id)
    ;
    this.us.users_set_active(
      user_ids,
      false
    ).subscribe({
      next: (r: ApiResponse) => {
        if (r.success) {
          console.info('//todo next');
        } else {
          console.error('//todo', r.message);
        }
      },
      error: (e) => {
        console.error('//todo', e);
      },
      complete: () => {
        this.refresh();
      }
    });
  }

  handle_tenants_selected(
    tenants: Array<Tenant>
  ): void {
    console.debug('handle_tenants_selected', tenants);
    this.nav_tenant_selector?.close();

    let tenant_ids = tenants.map(t => t.id);

    let user_ids = (this.component.formUsers.get('users') as FormArray)?.controls
      .filter(c => (c as FormGroup).get('selected')?.value === true)
      .map(c => c.value)
      .map(c => c.id)
    ;

    console.debug(user_ids);

    this.us.user_assign_tenant(
      user_ids,
      tenant_ids
    ).subscribe({
      next: (r: ApiResponse) => {
        if (r.success) {
          console.info('//todo', r);
        } else {
          console.error('//todo', r.message);
        }
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
        console.info('//todo complete');
      }
    });
  }
}
