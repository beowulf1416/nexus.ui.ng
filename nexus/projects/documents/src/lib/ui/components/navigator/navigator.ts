import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Folder } from '../../../ui/components/folder/folder';

@Component({
  selector: 'doc-navigator',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    Folder
  ],
  templateUrl: './navigator.html',
  styleUrl: './navigator.css',
})
export class Navigator {}
