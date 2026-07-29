import { Component, OnInit, signal, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { form, FormField, required } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

import { NotificationService } from 'core';
import { LocationData } from '../../../models/location-data';
import { ItemData } from '../../../models/item-data';
import { ActivatedRoute } from '@angular/router';


class LocationRow {
  constructor(
    readonly location: LocationData,
    public selected: boolean = false,
  ) { }
}

@Component({
  selector: 'lib-item',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    FormField
  ],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item implements OnInit {

  general = signal({
    name: '',
    description: '',
    identifier: {
      sku: '',
      upc: ''
    },
    flags: {
      perishable: false,
      flammable: false,
      hazardous: false,
      esd_sensitive: false
    },
  });
  locations = signal({
    filter: '',
    locations: new Array<LocationRow>(),
  });
  substitutes = signal({
    filter: '',
    substitutes: new Array<ItemData>(),
  });

  component = {
    errors: signal(new Array<string>()),
    general: form(this.general, (f) => {
      required(f.name, { message: 'Name is required' });
    }),
    locations: form(this.locations, (f) => {

    }),
    substitutes: form(this.substitutes, (f) => {

    }),
  };

  private ns = inject(NotificationService);
  private route = inject(ActivatedRoute);

  constructor() { }

  ngOnInit(): void {
    const item_id = this.route.snapshot.paramMap.get('item_id');
    console.debug('item_id', item_id);
  }

  on_general_submit(event: Event): void {
    event.preventDefault();
    console.info('on_general_submit');
  }

  on_substitutes_submit(event: Event): void {
    event.preventDefault();
    console.info('on_substitutes_submit');
  }

  on_locations_submit(event: Event): void {
    event.preventDefault();
    console.info('on_locations_submit');
  }
}
