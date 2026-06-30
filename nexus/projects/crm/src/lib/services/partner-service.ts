import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { ApiResponse, Uuid } from 'core';
import { URLS } from '../crm.constants';

import { Person } from '../models/person';
import { Business } from '../models/business';



@Service()
export class PartnerService {

  http = inject(HttpClient);

  constructor(
    // private http: HttpClient
  ) {}

  person_save(
    tenant_id: Uuid,
    person: Person
  ): Observable<ApiResponse> {
    console.info('person_save');

    return this.http.post<ApiResponse>(
      `${URLS.base_url}${URLS.person_save}`,
      {
        tenant_id: tenant_id.to_string(),
        person_id: person.person_id.to_string(),
        first_name: person.first_name,
        middle_name: person.middle_name,
        last_name: person.last_name,
        prefix: person.prefix,
        suffix: person.suffix,
        // todo gender
        gender: 0
      }
    );
  }

  business_save(
    business: Business
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${URLS.base_url}${URLS.business_save}`,
      {
        tenant_id: business.tenant_id,
        business_id: business.business_id,
        name: business.name,
        description: business.description,
      }
    );
  }
}
