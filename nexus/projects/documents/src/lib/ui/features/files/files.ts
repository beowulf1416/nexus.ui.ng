import { Component } from '@angular/core';
import { Header } from 'core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Navigator } from '../../../ui/components/navigator/navigator';


@Component({
  selector: 'lib-files',
  imports: [
    Header,
    Navigator,
    MatToolbarModule,
  ],
  templateUrl: './files.html',
  styleUrl: './files.css',
})
export class Files {}
