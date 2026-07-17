import { Component, computed, output, signal } from '@angular/core';
import { inject } from '@angular/core/primitives/di';
import { MatDialog } from '@angular/material/dialog';
import { CountrySelectorDialog } from '../../dialogs/country-selector-dialog/country-selector-dialog';
import { NotificationService } from '../../../services/notification-service';


interface Country {
  id: string;
  name: string;
}

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

  private md = inject(MatDialog);
  private notification_service = inject(NotificationService);

  country = output<Country>();

  constructor() { }

  on_click(event: Event): void {
    console.info('on_click');
    event.preventDefault();

    let dr = this.md.open(CountrySelectorDialog, {
      position: { top: '10px', right: '10px' },
      data: {
        country_id: this.model().country_id,
        name: this.model().name,
      }
    });
    dr.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.model.set(result);
          this.country.emit(result);
        }
      },
      error: (e: any) => {
        console.error(e);
        this.notification_service.error(e);
      }
    });
  }
}
