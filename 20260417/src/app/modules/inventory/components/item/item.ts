import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-item',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule
  ],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item {

  component = {
    error: '',
    form_item: new FormGroup({
      id: new FormControl('', []),
      name: new FormControl('', []),
      description: new FormControl('', []),
      sku: new FormControl('', []),
      upc: new FormControl('', [])
    })
  };

}
