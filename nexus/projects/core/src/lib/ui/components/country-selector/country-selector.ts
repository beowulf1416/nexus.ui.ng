import { Component, computed, model, output, signal, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CountrySelectorDialog } from '../../dialogs/country-selector-dialog/country-selector-dialog';
import { NotificationService } from '../../../services/notification-service';
import { FormField, FormValueControl } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from '../../../services/common-service';
import { Country } from '../../../models/country';


// interface Country {
//   id: string;
//   name: string;
// }

@Component({
  selector: 'country-selector',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FormField
  ],
  templateUrl: './country-selector.html',
  styleUrl: './country-selector.css',
})
export class CountrySelector implements FormValueControl<number>, OnInit {
  value = model<number>(0);

  model = signal({
    selected: {
      country_id: 0,
      // name: '',
    },
    countries: new Array<Country>(),
  });

  // title = computed(() => {
  //   let name = this.model().selected.name;
  //   return name == '' ? 'Select Country' : name;
  // });

  private md = inject(MatDialog);
  private notification_service = inject(NotificationService);
  private cs = inject(CommonService);

  // country = output<Country>();

  constructor() { }

  ngOnInit(): void {
    this.cs.fetch_countries().subscribe({
      next: (r: Country[]) => {
        if (r) {
          this.model.update((m) => ({
            ...m,
            countries: r
          }));
        }
      },
      error: (e: HttpErrorResponse) => {
        console.error(e);
        this.notification_service.error(e.message);
      }
    });
  }
}
