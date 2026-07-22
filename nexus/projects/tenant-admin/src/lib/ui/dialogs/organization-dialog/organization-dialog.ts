import { Component, computed, inject, signal } from '@angular/core';
import { form, FormField, required, submit, validate } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { OrganizationSelector, OrganizationData } from 'organization-selector';
import { OrganizationsService } from '../../../services/organizations-service';
import { ApiResponse, NotificationService, Uuid } from 'core';
import { HttpErrorResponse } from '@angular/common/http';

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
    parent_org_id: '',
    version: 0
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      required(f.name, { message: "Name is required" });
      validate(f.parent_org_id, ({ value }) => {
        if (value() == '') {
          return {
            kind: 'parent_org_id',
            message: 'Please select parent organization'
          }
        }
        return null;
      })
    })
  };

  title = computed(() => {
    return this.model().name == '' ? "New Organization" : this.model().name;
  });

  private dr = inject(MatDialogRef<OrganizationDialog>);
  private org_service = inject(OrganizationsService);
  private notification_service = inject(NotificationService);

  constructor() { }

  save(event: Event): void {
    event.preventDefault();

    submit(this.component.form, async () => {
      const model = this.model();

      this.org_service.organization_save(new Uuid(model.org_id), new Uuid(model.parent_org_id), model.name, model.description, model.version).subscribe({
        next: (r: ApiResponse) => {
          if (r.success) {
            this.dr.close();
          }
        },
        error: (e: HttpErrorResponse) => {
          console.error(e);
          this.notification_service.error(e.message);
        }
      });
    });
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
