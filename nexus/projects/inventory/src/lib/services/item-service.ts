import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ItemData } from '../models/item-data';
import { Observable } from 'rxjs';

import { ApiResponse } from 'core';
import { URLS } from '../inventory.constants';

@Service()
export class ItemService {

  private http = inject(HttpClient);

  constructor() { }

  item_save(item: ItemData): Observable<ApiResponse> {
    const d = {
      ...item,
      item_id: item.item_id.to_string()
    };
    return this.http.post<ApiResponse>(URLS.item_save, d);
  }
}
