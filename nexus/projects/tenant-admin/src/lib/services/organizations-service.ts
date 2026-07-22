import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class OrganizationsService {

  private http = inject(HttpClient);

  constructor() { }


}
