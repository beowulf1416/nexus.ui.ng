import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item {

  component = {
    error: '',
    form_item: new FormGroup({
      id: new FormControl('', []),
      name: new FormControl('', []),
      description: new FormControl('', []),
      sku: new FormControl('', []),
      upc: new FormControl('', [])
    })
  };

}
