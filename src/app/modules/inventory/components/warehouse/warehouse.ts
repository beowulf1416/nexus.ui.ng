import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NotificationService } from '../../../../services/notification-service';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { WarehouseService } from '../../services/warehouse-service';
import { CountrySelector } from '../../../country-selector/components/country-selector/country-selector';
import { Country } from '../../../country-selector/classes/country';

@Component({
  selector: 'app-warehouse',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    CountrySelector
  ],
  templateUrl: './warehouse.html',
  styleUrl: './warehouse.css',
})
export class Warehouse {

  @ViewChild("nav_end_inv") nav_end!: MatSidenav;

  component = {
    error: '',
    countries: [],
    form_warehouse: new FormGroup({
      warehouse_id: new FormControl('', []),
      name: new FormControl('', []),
      description: new FormControl('', []),
      address: new FormGroup({
        street: new FormControl('', []),
        city: new FormControl('', []),
        state: new FormControl('', []),
        zip: new FormControl('', []),
        country_id: new FormControl('', [])
      })
    })
  };


  constructor(
    private ns: NotificationService,
    private ws: WarehouseService
  ) {}

  save(): void {
    console.debug("save");
  }

  select_country(): void {
    console.debug("select_country");
    
    this.nav_end?.open();
  }

  on_countries_selected(countries: Array<Country>): void {
    console.debug("on_countries_selected", countries);
    
    this.nav_end?.close();
  }
}
