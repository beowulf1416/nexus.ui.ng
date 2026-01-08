import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CountrySelector } from '../country-selector/country-selector';
import { Field, form } from '@angular/forms/signals';
import { CountryService } from '../../services/country-service';
import { Country } from '../../classes/country';

@Component({
  selector: 'app-country-selector-dialog',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    Field
  ],
  templateUrl: './country-selector-dialog.html',
  styleUrl: './country-selector-dialog.css',
})
export class CountrySelectorDialog {

  country_selector = signal({
    filter: '',
    matches: new Array<Country>(),
    selected: new Array<Country>()
  });

  component = {
    form_country_selector: form(this.country_selector)
  };

  constructor(
    private dref: MatDialogRef<CountrySelector>,
    private cs: CountryService
  ) {}

  ok(): void {
    console.debug("ok");

    this.dref.close();
  }

  cancel(): void {
    console.debug("cancel");

    this.dref.close();
  }

  search(): void {
    console.debug("search");

    const filter = this.component.form_country_selector.filter().value();

    this.cs.fetch_countries(filter).subscribe(countries => {
      this.component.form_country_selector.matches().value.set(countries);
    });
  }

  reset(): void {
    console.debug("reset");

    this.country_selector().filter = "";
  }

  on_select_country(c: Country): void {
    console.debug("on_select_country", c);

    let s = new Country(
      c.country_id,
      c.name,
      c.alpha2,
      c.alpha3
    );

    this.country_selector.update((v) => ({
      ...v,
      selected: [
        ...v.selected,
        s
      ]
    }));
  }

  on_deselect_country(c: Country): void {
    console.debug("on_deselect_country", c);

    let country_id = c.country_id;

    this.country_selector.update((v) => ({
      ...v,
      selected: v.selected.filter((elem) => elem.country_id != country_id)
    }));
  }
}
