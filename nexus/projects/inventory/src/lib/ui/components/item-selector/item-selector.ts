import { Component, computed, inject, model, OnInit, output, signal } from '@angular/core';
import { ItemService } from '../../../services/item-service';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ItemSelectorDialog } from '../../dialogs/item-selector-dialog/item-selector-dialog';
import { ItemData } from '../../../models/item-data';


@Component({
  selector: 'item-selector',
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './item-selector.html',
  styleUrl: './item-selector.css',
})
export class ItemSelector implements OnInit {
  model = signal({
    item_id: '',
    name: ''
  });

  title = computed(() => {
    const name = this.model().name;
    return name == '' ? 'Select Item' : name;
  });

  items_selected = output<Array<ItemData>>();

  private is = inject(ItemService);
  private md = inject(MatDialog);

  constructor() { }

  ngOnInit(): void {
    console.info('ngOnInit');

  }

  on_click(event: Event): void {
    event.preventDefault();
    console.info('on_click');

    const dr = this.md.open(ItemSelectorDialog, {
      position: { top: '1em', right: '1em' }
    });
    dr.afterClosed().subscribe({
      next: (result: Array<ItemData>) => {
        console.debug(result);
        this.items_selected.emit(result);
      },
      error: (e: any) => {
        console.error(e);
      }
    });
  }
}
