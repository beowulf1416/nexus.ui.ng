import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-currency-selector-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule
  ],
  templateUrl: './currency-selector-dialog.html',
  styleUrl: './currency-selector-dialog.css',
})
export class CurrencySelectorDialog {

  constructor(
    private dref: MatDialogRef<CurrencySelectorDialog>
  ) {}

  ok(): void {
    console.debug("ok");

    this.dref.close();
  }

  cancel(): void {
    console.debug("cancel");

    this.dref.close();
  }
}
