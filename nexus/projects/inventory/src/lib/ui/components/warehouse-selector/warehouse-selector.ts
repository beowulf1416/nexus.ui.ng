import { Component, inject, model, OnInit, signal } from '@angular/core';
import { FormField, FormValueControl } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { WarehouseService } from '../../../services/warehouse-service';
import { WarehouseData } from '../../../models/warehouse-data';

@Component({
  selector: 'warehouse-selector',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormField
  ],
  templateUrl: './warehouse-selector.html',
  styleUrl: './warehouse-selector.css',
})
export class WarehouseSelector implements FormValueControl<string>, OnInit {
  value = model<string>('');

  model = signal({
    warehouses: new Array<WarehouseData>()
  });

  private ws = inject(WarehouseService);

  constructor() { }

  ngOnInit(): void {
    this.ws.warehouses_fetch('%').subscribe({
      next: (warehouses) => {
        this.model.update((m) => ({
          ...m,
          warehouses: warehouses
        }));
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
