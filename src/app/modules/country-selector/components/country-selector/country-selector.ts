import { booleanAttribute, Component, input, output } from '@angular/core';
import { CountryService } from '../../services/country-service';
import { NotificationService } from '../../../../services/notification-service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Country } from '../../classes/country';
import { ApiResponse } from '../../../../classes/api-response';

@Component({
  selector: 'app-country-selector',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './country-selector.html',
  styleUrl: './country-selector.css',
})
export class CountrySelector {


  multiple = input(false, { transform: booleanAttribute });
  countries_selected = output<Array<Country>>();

  components = {
    formCountries: new FormGroup({
      filter: new FormControl('', [])
    })
  };

  constructor(
    private ns: NotificationService,
    private cs: CountryService
  ) {}

  search(): void {
    console.debug("search");

    let filter = this.components.formCountries.get('filter')?.value || '';

    this.cs.fetch_countries(filter).subscribe((countries) => {
      console.debug("search", countries);
    });
  }

  reset(): void {
    console.debug("reset");
  }

  select(): void {
    console.debug("select");

  }
}
