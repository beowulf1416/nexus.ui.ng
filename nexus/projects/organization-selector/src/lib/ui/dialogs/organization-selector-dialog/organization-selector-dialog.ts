import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'lib-organization-selector-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatToolbarModule
  ],
  templateUrl: './organization-selector-dialog.html',
  styleUrl: './organization-selector-dialog.css',
})
export class OrganizationSelectorDialog {

  private dr = inject(MatDialogRef<OrganizationSelectorDialog>);

  on_select(event: Event): void {
    event.preventDefault();
  }

  on_cancel(event: Event): void {
    event.preventDefault();
    this.dr.close();
  }
}
