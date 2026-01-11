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
import { Field, form, submit } from '@angular/forms/signals';

@Component({
  selector: 'app-warehouse',
  imports: [
    CommonModule,
    // ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    Field,
    CountrySelector
  ],
  templateUrl: './warehouse.html',
  styleUrl: './warehouse.css',
})
export class Warehouse {

  // @ViewChild("nav_end_inv") nav_end!: MatSidenav;

  warehouse = signal({
    tenant_id: Uuid.generate(),
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

    console.debug(this.warehouse());
  }

  on_save(event: Event): void {
    event.preventDefault();

    submit(this.component.form_warehouse, async() => {
      console.debug("on_save", this.warehouse());

      let w = this.warehouse();
      this.ws.warehouse_save(
        w.tenant_id,
        w.warehouse_id,
        w.name,
        w.description,
        w.address
      ).subscribe({
        
      });
    });
  }

  // select_country(): void {
  //   console.debug("select_country");
    
  //   this.nav_end?.open();
  // }

  on_countries_selected(countries: Array<Country>): void {
    console.debug("on_countries_selected", countries);
    
    // this.nav_end?.close();
    
    if (countries.length > 0) {
      let country = countries[0];
      let country_id = country.country_id;

      this.warehouse.update((v) => ({
        ...v,
        address: {
          street: v.address.street,
          city: v.address.city,
          zip: v.address.zip,
          country_id: country_id
        }
      }));
    }
  }
}
