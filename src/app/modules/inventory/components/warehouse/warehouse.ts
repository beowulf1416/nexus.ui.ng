import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-warehouse',
  imports: [],
  templateUrl: './warehouse.html',
  styleUrl: './warehouse.css',
})
export class Warehouse {

  component = {
    error: '',
    form_warehouse: new FormGroup({
      name: new FormControl('', []),
      address: new FormControl('', [])
    })
  };
}
