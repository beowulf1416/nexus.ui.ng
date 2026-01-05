import { booleanAttribute, Component, input } from '@angular/core';
import { NotificationService } from '../../../../services/notification-service';
import { CurrencyService } from '../../services/currency-service';
import { MatDialog } from '@angular/material/dialog';
import { CurrencySelectorDialog } from '../currency-selector-dialog/currency-selector-dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-currency-selector',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './currency-selector.html',
  styleUrl: './currency-selector.css',
})
export class CurrencySelector {

  multiple = input(false, { transform: booleanAttribute });

  constructor(
    private ns: NotificationService,
    private cs: CurrencyService,
    private dialog: MatDialog
  ) {}

  select(): void {
    let dref = this.dialog.open(CurrencySelectorDialog, {
      position: {
        right: "10px"
      }
    });
    dref.afterClosed().subscribe(result => {
      console.debug("closed", result);
    });
  }
}
