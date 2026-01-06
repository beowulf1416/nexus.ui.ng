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
import { MatDialog } from '@angular/material/dialog';
import { CountrySelectorDialog } from '../country-selector-dialog/country-selector-dialog';

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
    private md: MatDialog
  ) {}


  show_dialog(): void {
    console.debug("show_dialog");

    let dref = this.md.open(CountrySelectorDialog, {
      position: {
        right: "10px"
      }
    });

    dref.afterClosed().subscribe(result => {
      console.debug("result", result);
    });
  }
}
