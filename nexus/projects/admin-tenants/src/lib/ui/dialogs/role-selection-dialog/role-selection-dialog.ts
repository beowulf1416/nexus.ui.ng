import { Component, signal, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { form, required, FormField } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RoleItem } from '../../../models/role-item';



class RoleItemRow {
  constructor(
    readonly role: RoleItem,
    readonly selected: boolean
  ){}
}

@Component({
  selector: 'lib-role-selection-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatToolbarModule,
    FormField
  ],
  templateUrl: './role-selection-dialog.html',
  styleUrl: './role-selection-dialog.css',
})
export class RoleSelectionDialog {

  dr = inject(MatDialogRef<RoleSelectionDialog>);

  model = signal({
    filter: '',
    matches: new Array<RoleItemRow>(),
    selected: new Array<RoleItemRow>()
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      required(f.filter, { message: 'Filter is required' })
    })
  };

  constructor() {}

  on_filter(event: Event): void {
    console.log('on_filter');
  }

  on_deselect_roles(event: Event, i: number): void {
    console.log('on_deselect_roles')
  }

  on_select_roles(event: Event, i: number): void {
    console.log('on_select_roles');
  }

  on_cancel(event: Event): void {
    event.preventDefault();
    this.dr.close();
  }

  on_ok(event: Event): void {
    event.preventDefault();
    const selected = this.model().selected.map((r) => r.role);
    this.dr.close(selected);
  }
}
