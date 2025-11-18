import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectorRef, Component, computed, input, OnInit, output, Signal, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TenantUserSelectorService } from '../../services/tenant-user-selector-service';
import { ApiResponse } from '../../../../classes/api-response';

import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';
import { User } from '../../classes/user';
import { UserService } from '../../../../services/user-service';
import { Tenant } from '../../../../classes/tenant';



@Component({
  selector: 'app-tenant-user-selector',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './tenant-user-selector.html',
  styleUrl: './tenant-user-selector.css',
})
export class TenantUserSelector implements OnInit {

  tenant = computed(() => this.us.current_tenant());

  multiple = input(true, { transform: booleanAttribute });
  selected = output<Array<string>>();

  component = {
    error: '',
    formTenantUsers: new FormGroup({
      filters: new FormGroup({
        filter: new FormControl('', [])
      }),
      matches: new FormArray([]),
      selection: new FormControl([])
    })
  };


  constructor(
    private tus: TenantUserSelectorService,
    private us: UserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.info('ngOnInit');

    console.debug(this.us.current_tenant());
  }

  get matches() {
    return this.component.formTenantUsers.get('matches') as FormArray;
  }

  get selection() {
    return this.component.formTenantUsers.get('selection') as FormArray;
  }


  clear_search(): void {
    console.info('clear_search()');
  }

  search(): void {
    console.info('search');
    console.debug(this.tenant());

    let tenant_id = this.tenant().tenant_id;
    let filter = this.component.formTenantUsers.get('filters.filter')?.value || '';

    this.tus.fetch(
      tenant_id,
      filter
    ).subscribe({
      next: (r: ApiResponse) => {
        if (r.success) {
          let users = (r.data as {
            users: Array<User>
          }).users;

          let mfa = (this.component.formTenantUsers.get('matches') as FormArray);
          mfa.clear();
          users.forEach((u: User, i: number) => {
            mfa.push(new FormGroup({
              user_id: new FormControl(u.user_id, []),
              name: new FormControl(u.name, []),
              email: new FormControl(u.email, [])
            }));
          });
          this.cd.detectChanges();
        } else {
          console.debug('//todo', r);
        }
      },
      error: (e) => {
        console.error('//todo', e);
      },
      complete: () => {
        console.info('//todo complete');
      }
    });
  }

  select_user(u: User): void {
    console.info('select_user');

    let sfa = this.component.formTenantUsers.get('selection') as FormArray;
    sfa.push(new FormGroup({
      user_id: new FormControl(u.user_id, []),
      name: new FormControl(u.name, []),
      email: new FormControl(u.email, [])
    }));
    this.cd.detectChanges();
  }

  select(): void {
    console.info('select');
    this.selected.emit(['todo']);
  }
}
