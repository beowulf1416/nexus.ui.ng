import { Component, signal, input, computed } from '@angular/core';
import { DocumentService } from '../../../services/document-service';
import { FolderData } from '../../../models/folder-data';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { ApiResponse, Uuid } from 'core';



@Component({
  selector: 'doc-folder',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './folder.html',
  styleUrl: './folder.css',
})
export class Folder {

  name = input<string>('');
  subfolders = signal<Array<FolderData>>(new Array<FolderData>());

  collapsed = signal<boolean>(true);
  is_collapsed = computed(() => this.collapsed());

  loading = signal<boolean>(false);
  is_loading = computed(() => this.loading());

  loaded = signal<boolean>(false);
  is_loaded = computed(() => this.loaded());

  component = {
  };

  constructor(
    private doc_service: DocumentService
  ) {}

  toggle_collapsed() {
    this.collapsed.set(!this.collapsed());
    if (!this.is_loaded()) {
      // load subfolders
      this.loading.set(true);
      this.doc_service.fetch_folders(
        new Uuid()
      ).subscribe({
        next: (r: ApiResponse) => {
          console.debug(r);
          if (r.success) {
            let folders = (r.data as {
              folders: Array<FolderData>
            }).folders;
            let old = this.subfolders();
            this.subfolders.set([...old, ...folders]);
          } else {
            console.error(r.message);
          }
        },
        complete: () => {
          this.loading.set(false);
          this.loaded.set(true);
        },
        error: (e: any) => {
          console.error(e);
        }
      });
    }
  }
}
