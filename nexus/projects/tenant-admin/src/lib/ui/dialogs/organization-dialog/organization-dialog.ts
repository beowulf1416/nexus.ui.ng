import { Component, computed, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { OrganizationSelector, OrganizationData } from 'organization-selector';

@Component({
  selector: 'lib-organization-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    FormField,
    OrganizationSelector
  ],
  templateUrl: './organization-dialog.html',
  styleUrl: './organization-dialog.css',
})
export class OrganizationDialog {
  model = signal({
    org_id: '',
    name: '',
    description: '',
    parent_org_id: ''
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      required(f.name, { message: "Name is required" });
    })
  };

  title = computed(() => {
    return this.model().name == '' ? "New Organization" : this.model().name;
  });

  private dr = inject(MatDialogRef<OrganizationDialog>);

  constructor() { }

  save(event: Event): void {
    event.preventDefault();

    const model = this.model();
    console.debug(model);
  }

  on_cancel(event: Event): void {
    event.preventDefault();
    this.dr.close();
  }

  on_selected(org: OrganizationData): void {
    this.model.update((m) => ({
      ...m,
      parent_org_id: org.org_id
    }));
  }
}
