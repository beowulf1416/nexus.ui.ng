import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ApiResponse, Uuid } from 'core';
import { LocationData } from '../models/location-data';
import { catchError, map, Observable } from 'rxjs';
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

  locations_fetch(warehouse_id: Uuid, filter: string): Observable<LocationData[]> {
    console.info('locations_fetch');
    return this.http.post<ApiResponse>(
      URLS.locations_fetch,
      {
        warehouse_id: warehouse_id.to_string(),
        filter: filter
      },
    ).pipe(
      map((r: ApiResponse) => {
        if (r.success && r.data) {
          const locations = (r.data as {
            locations: LocationData[]
          }).locations;
          return locations;
        }
        return [];
      }),
      catchError((e: any) => {
        console.error(e);
        throw e;
      })
    );
  }
}
