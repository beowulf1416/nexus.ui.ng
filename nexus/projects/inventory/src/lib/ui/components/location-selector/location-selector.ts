import { Component, computed, inject, model, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocationSelectorDialog } from '../../dialogs/location-selector-dialog/location-selector-dialog';
import { FormValueControl } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LocationData } from '../../../models/location-data';
import { Uuid } from 'core';

@Component({
  selector: 'location-selector',
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './location-selector.html',
  styleUrl: './location-selector.css',
})
export class LocationSelector implements FormValueControl<string>, OnInit {
  value = model<string>('');
  model = signal({
    location_id: '',
    name: ''
  });

  title = computed(() => {
    const name = this.model().name;
    return name == '' ? "Select Location" : name;
  });


  private md = inject(MatDialog);

  constructor() { }

  ngOnInit(): void {
    console.info('ngOnInit');
  }

  on_click(event: Event): void {
    event.preventDefault();

    const dr = this.md.open(LocationSelectorDialog, {
      position: { top: '1em', right: '1em' }
    });
    dr.afterClosed().subscribe({
      next: (result: LocationData) => {
        if (result) {
          const location_id = result.location_id instanceof Uuid ? result.location_id.to_string() : result.location_id;
          const model = {
            location_id: location_id,
            name: result.name
          };
          this.model.set(model);
          this.value.set(location_id);
        }
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
