import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { AppHeader } from 'core';
import { Navigator } from '../../../ui/components/navigator/navigator';
import { UploadDialog } from '../../dialogs/upload-dialog/upload-dialog';


@Component({
  selector: 'lib-files',
  imports: [
    AppHeader,
    Navigator,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  templateUrl: './files.html',
  styleUrl: './files.css',
})
export class Files {

  constructor(
    private md: MatDialog
  ) {
  }

  on_upload(event: Event): void {
    let dr = this.md.open(UploadDialog, {
      position: {
        right: '10px'
      },
    });
    dr.afterClosed().subscribe((result: any) => {
      console.debug(result);
    });
  }
}
