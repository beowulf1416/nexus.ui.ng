import { Component, effect, inject, model, OnInit, signal } from '@angular/core';
import { FormField, FormValueControl } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonService } from '../../../services/common-service';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Dimension } from '../../../models/dimension';
import { Uom } from '../../../models/uom';

@Component({
  selector: 'uom-selector',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormField
  ],
  templateUrl: './uom-selector.html',
  styleUrl: './uom-selector.css',
})
export class UomSelector implements FormValueControl<string>, OnInit {
  value = model<string>('');

  model = signal({
    dimension_id: 0,
    uom_id: '',
  });

  dimensions = signal(new Array<Dimension>());

  uoms = signal(new Array<Uom>());

  dimensions_loading = signal(false);
  uoms_loading = signal(false);

  private cs = inject(CommonService);

  constructor() {}

  ngOnInit(): void {
    this.dimensions_loading.set(true);
    this.cs.fetch_dimensions().subscribe({
      next: (dimensions) => {
        this.dimensions.set(dimensions.map((d) => ({
          dimension_id: d.dimension_id,
          name: d.name,
        })));
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
        this.dimensions_loading.set(false);
      },
    });
  }

  on_selection_change(event: MatSelectChange): void {
    const value = event.value;

    this.uoms_loading.set(true);
    this.cs.fetch_uoms_by_dimension(value).subscribe({
      next: (uoms) => {
        this.uoms.set(uoms.map((u) => ({
          uom_id: u.uom_id,
          name: u.name,
        })));
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
        this.uoms_loading.set(false);
      },
    });
  }

  on_uom_selection_change(event: MatSelectChange): void {
    const value = event.value;
    this.model.update((m) => ({ ...m, uom_id: value }));
  }
}
