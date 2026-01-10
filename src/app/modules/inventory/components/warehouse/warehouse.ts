import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
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
import { Uuid } from '../../../../classes/uuid';
import { form } from '@angular/forms/signals';

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

  warehouse = signal({
    warehouse_id: Uuid.generate(),
    name: "",
    description: "",
    address: {
      street: "",
      city: "",
      zip: "",
      country_id: -1
    }
  })

  component = {
    error: '',
    countries: new Array<Country>(),
    // form_warehouse: new FormGroup({
    //   warehouse_id: new FormControl('', []),
    //   name: new FormControl('', []),
    //   description: new FormControl('', []),
    //   address: new FormGroup({
    //     street: new FormControl('', []),
    //     city: new FormControl('', []),
    //     state: new FormControl('', []),
    //     zip: new FormControl('', []),
    //     country_id: new FormControl('', [])
    //   })
    // })
    form_warehouse: form(this.warehouse)
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
