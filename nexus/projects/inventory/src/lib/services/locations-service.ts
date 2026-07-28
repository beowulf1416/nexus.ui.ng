import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ApiResponse, Uuid } from 'core';
import { LocationData } from '../models/location-data';
import { Observable } from 'rxjs';
import { URLS } from '../inventory.constants';

@Service()
export class LocationsService {

  private http = inject(HttpClient);

  constructor() { }

  location_save(warehouse_id: Uuid, location: LocationData): Observable<ApiResponse> {
    const l = {
      ...location,
      location_id: location.location_id.to_string()
    };
    return this.http.post<ApiResponse>(URLS.location_save, { warehouse_id: warehouse_id.to_string(), location: l });
  }
}
