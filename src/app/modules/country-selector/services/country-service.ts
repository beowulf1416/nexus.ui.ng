import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, of } from 'rxjs';
import { Country } from '../classes/country';
import { ApiResponse } from '../../../classes/api-response';
import { CONSTANTS } from '../../../classes/constants';
import { COUNTRY_CONSTANTS } from '../classes/country-constants';
import { NotificationService } from '../../../services/notification-service';


class CountryResponseData {

  constructor(
    readonly id: number,
    readonly name: string,
    readonly code_2: string,
    readonly code_3: string
  ) {}
};


@Injectable({
  providedIn: 'root',
})
export class CountryService {
  
  private _cache: Array<Country> = new Array<Country>();

  constructor(
    private http: HttpClient,
    private ns: NotificationService
  ) {}


  fetch_countries(
    country: string
  ): Observable<Array<Country>> {
    console.debug("fetch_countries");

    if (this._cache.length == 0) {
      return this.http.post<ApiResponse>(
        CONSTANTS.api_base_url + COUNTRY_CONSTANTS.path_countries_fetch,
        {}
      ).pipe(
        map((v,i) => {
          if (v.success) {
            this._cache = (v.data as {
              countries: Array<CountryResponseData>
            }).countries.map((v, i) => {
              return new Country(
                v.id,
                v.name,
                v.code_2,
                v.code_3
              )
            });

            let filtered: Array<Country> = this._cache.filter((v, i) => v.name.indexOf(country, 0) != -1);
            return filtered
          } else {
            console.error("fetch_countries", v);
            this.ns.error("error while fetching countries");

            return new Array<Country>();
          }
        })
      ); 
    } else {
      let filtered: Array<Country> = this._cache.filter((v, i) => v.name.indexOf(country, 0) != -1);

      return of(filtered);
    }
  }
}
