import { Component, signal, computed, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { form, FormField, required, submit, FieldTree } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { map, of, catchError } from 'rxjs';

import { ApiResponse, Uuid, NotificationService, UserService } from 'core';
import { HTTP_STATUS } from 'core';
import { PartnerDialog } from '../../dialogs/partner-dialog/partner-dialog';
// import { PersonDialog } from '../../dialogs/person-dialog/person-dialog';
// import { BusinessDialog } from '../../dialogs/business-dialog/business-dialog';
import { PartnerService } from '../../../services/partner-service';

import { Partner } from '../../../models/partner';
// import { Person } from '../../../models/person';



class PartnerRow {
  constructor(
    readonly partner: Partner,
    readonly selected: boolean = false
  ){}
}


class PartnerDialogDataResult {
  constructor(
    readonly tenant_id: string,
    readonly partner_id: string,
    readonly business_name: string,
    readonly description: string,
    readonly first_name: string,
    readonly middle_name: string,
    readonly last_name: string,
    readonly prefix: string,
    readonly suffix: string,
  ){}
}

// class BusinessDialogDataResult {
//   constructor(
//     readonly tenant_id: string,
//     readonly business_id: string,
//     readonly name: string,
//     readonly description: string,
//   ){}
// }



@Component({
  selector: 'lib-partners',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    FormField
  ],
  templateUrl: './partners.html',
  styleUrl: './partners.css',
})
export class Partners {
  model = signal({
    filter: '',
    partners: new Array<PartnerRow>()
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      required(f.filter, { message: 'Filter is required' });
    }),
  };

  active_disabled = computed(() => {
    return this.model().partners.filter((t) => t.selected).length < 1;
  });
  reset_disabled = computed(() => {
    return this.model().filter.length < 1;
  });

  md = inject(MatDialog);
  user_service = inject(UserService);
  partner_service = inject(PartnerService);
  notification_service = inject(NotificationService);

  current_tenant = computed(() => this.user_service.current_user().tenant);

  constructor() {

  }

  fetch_partners(): void {
    console.info('fetch_people');
    // console.debug(this.current_tenant().id);

    const model = this.model();
    this.partner_service.fetch_partners(
      this.current_tenant().id,
      model.filter
    ).subscribe({
      next: (r: Array<Partner>) => {
        this.model.update((m) => ({
          ...m,
          partners: r.map((p) => new PartnerRow(p, false))
        }));
      },
      error: (e: HttpErrorResponse) => {
        this.notification_service.error(e.message);
      },
    });
  }

  on_filter(event: Event): void {
    console.info('on_filter');
    event.preventDefault();

    this.fetch_partners();
  }

  on_reset_filter(event: Event): void {
    console.info('on_reset_filter');
    event.preventDefault();

    this.model.update((m) => ({
      ...m,
      filter: ''
    }));

    this.fetch_partners();
  }

  on_refresh(event: Event): void {
    console.info('on_refresh');
    event.preventDefault();

    this.fetch_partners();
  }

  new_partner_dialog(event: Event): void {
    console.info('new_partner_dialog');
    event.preventDefault();

    const tenant_id = this.current_tenant().id;
    const dialog_ref = this.md.open(PartnerDialog, {
      position: {
        top: '20px',
        right: '10px'
      },
      data: {
        tenant_id: tenant_id,
        partner_id: null
      }
    });
    dialog_ref.afterClosed().subscribe({
      next: (result: PartnerDialogDataResult) => {
        console.debug(result);
      },
      error: (e: any) => {
        console.error(e);
        this.notification_service.error(e);
      },
    });
  }

  // new_person_dialog(event: Event): void {
  //   console.info('new_person_dialog');
  //   event.preventDefault();

  //   const tenant_id = this.current_tenant().id;
  //   // console.debug(tenant_id);

  //   let dr = this.md.open(PersonDialog, {
  //     position: {
  //       top: '20px',
  //       right: '10px'
  //     },
  //     data: {
  //       tenant_id: tenant_id,
  //       person_id: null
  //     }
  //   });
  //   dr.afterClosed().subscribe({
  //     next: (result: PersonDialogDataResult) => {
  //       // this.partner_service.person_save(
  //       //   new Uuid(result.tenant_id),
  //       //   new Person(
  //       //     new Uuid(result.person_id),
  //       //     result.first_name,
  //       //     result.middle_name,
  //       //     result.last_name,
  //       //     result.prefix,
  //       //     result.suffix,
  //       //     new Date(),
  //       //     true
  //       //   )
  //       // ).subscribe({
  //       //   next: (r: ApiResponse) => {
  //       //     console.debug(r);
  //       //   },
  //       //   error: (e: HttpErrorResponse) => {
  //       //     console.error(e);
  //       //     this.notification_service.error(e.message);
  //       //   },
  //       // });
  //       console.debug(result);
  //     },
  //     error: (e: any) => {
  //       console.error(e);
  //       this.notification_service.error(e);
  //     },
  //   });
  // }

  // new_business_dialog(event: Event): void {
  //   console.info('new_business_dialog');
  //   event.preventDefault();

  //   const tenant_id = this.current_tenant().id;

  //   let dr = this.md.open(BusinessDialog, {
  //     position: {
  //       top: '20px',
  //       right: '10px'
  //     },
  //     data: {
  //       tenant_id: tenant_id,
  //       business_id: null
  //     }
  //   });
  //   dr.afterClosed().subscribe({
  //     next: (result: BusinessDialogDataResult) => {
  //       console.debug(result);
  //     },
  //     error: (e: any) => {
  //       console.error(e);
  //       this.notification_service.error(e);
  //     },
  //   });

  // }

  on_edit_person(event: Event, i: number): void {
    console.info('on_edit_person');
    event.preventDefault();

  }

  on_set_active(event: Event, active: boolean): void {
    console.info('on_set_active');
    event.preventDefault();

  }

  on_select_all(event: Event): void {
    console.info('on_select_all');
    event.preventDefault();

  }

  on_select_item(event: Event): void {
    console.info('on_select_item');
    event.preventDefault();

  }
}
