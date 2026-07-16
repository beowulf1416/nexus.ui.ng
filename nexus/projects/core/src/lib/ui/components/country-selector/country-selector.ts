import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'country-selector',
  imports: [],
  templateUrl: './country-selector.html',
  styleUrl: './country-selector.css',
})
export class CountrySelector {

  model = signal({
    country_id: '',
    name: '',
  });

  title = computed(() => {
    return this.model().name == '' ? 'Select Country' : this.model().name;
  });

  constructor() { }
}
