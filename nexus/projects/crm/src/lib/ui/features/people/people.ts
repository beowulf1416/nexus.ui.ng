import { Component, signal, computed, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { form, FormField, required, submit, FieldTree } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { ApiResponse, Uuid } from 'core';
import { HTTP_STATUS } from 'core';
import { PersonDialog } from '../../dialogs/person-dialog/person-dialog';

import { Person } from '../../../models/person';


class PersonRow {
  constructor(
    readonly person: Person,
    readonly selected: boolean = false
  ){}
}


@Component({
  selector: 'lib-people',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    FormField
  ],
  templateUrl: './people.html',
  styleUrl: './people.css',
})
export class People {
  model = signal({
    filter: '',
    people: new Array<PersonRow>()
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      required(f.filter, { message: 'Filter is required' });
    }),
  };

  active_disabled = computed(() => {
    return this.model().people.filter((t) => t.selected).length < 1;
  });
  reset_disabled = computed(() => {
    return this.model().filter.length < 1;
  });

  md = inject(MatDialog);

  constructor() {

  }

  fetch_people(): void {
    console.info('fetch_people');

  }

  on_filter(event: Event): void {
    console.info('on_filter');
    event.preventDefault();

  }

  on_reset_filter(event: Event): void {
    console.info('on_reset_filter');
    event.preventDefault();

  }

  on_refresh(event: Event): void {
    console.info('on_refresh');
    event.preventDefault();

  }

  new_person_dialog(event: Event): void {
    console.info('new_person_dialog');
    event.preventDefault();

    let dr = this.md.open(PersonDialog, {});
    dr.afterClosed().subscribe({
      next: (result: any) => {
        console.debug(result);
      },
      error: (e: any) => {
        console.error(e);
      },
    });

  }

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
