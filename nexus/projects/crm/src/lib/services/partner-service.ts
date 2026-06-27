import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { ApiResponse } from 'Core';
import { Person } from '../models/person.model';
import { Business } from '../models/business.model';



@Service()
export class PartnerService {

  constructor(
    private http: HttpClient
  ) {}

  person_save(
    person: Person
  ): Observable<ApiResponse> {
    console.info('person_save');
  }

  business_save(
    business: Business
  ): Observable<ApiResponse> {

  }
}
