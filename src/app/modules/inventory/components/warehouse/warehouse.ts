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
import { UserService } from '../../../../services/user-service';
import { Warehouse as WarehouseObj } from '../../classes/warehouse';
import { Address } from '../../../shared/address';
import { ApiResponse } from '../../../../classes/api-response';

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

  model_warehouse = signal({
    // tenant_id: Uuid.nil(),
    warehouse_id: Uuid.nil().to_string(),
    name: "",
    description: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country_id: -1
    }
  })

  component = {
    error: '',
    countries: new Array<Country>(),
    form_warehouse: form(this.model_warehouse)
  };


  constructor(
    private ns: NotificationService,
    private ws: WarehouseService,
    private us: UserService
  ) {}

  save(): void {
    console.debug("save");

    console.debug(this.model_warehouse());
  }

  on_save(event: Event): void {
    event.preventDefault();

    let tenant_id = this.us.current_tenant().tenant_id;

    submit(this.component.form_warehouse, async() => {
      console.debug("on_save", this.model_warehouse());

      let model = this.model_warehouse();

      this.ws.warehouse_save(
        tenant_id,
        new WarehouseObj(
          Uuid.from_string(model.warehouse_id),
          model.name,
          model.description,
          new Address(
            model.address.street,
            model.address.city,
            model.address.state,
            model.address.zip,
            model.address.country_id
          )
        )
      ).subscribe({
        next: (r: ApiResponse) => {
          console.debug("on_save next", r);
        },
        error: (e) => {
          console.error("on_save error", e);
        },
        complete: () => {
          console.info("on_save complete");
        }
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

      this.model_warehouse.update((v) => ({
        ...v,
        address: {
          street: v.address.street,
          city: v.address.city,
          state: v.address.state,
          zip: v.address.zip,
          country_id: country_id
        }
      }));
    }
  }
}
