import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sources-list',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule
  ],
  templateUrl: './sources-list.html',
  styleUrl: './sources-list.css',
})
export class SourcesList {

  search(): void {
    console.info('search');
  }

  reset(): void {
    console.info('reset');
  }

  set_active(): void {
    console.info('set_active');
  }

  set_inactive(): void {
    console.info('set_inactive');
  }


}
