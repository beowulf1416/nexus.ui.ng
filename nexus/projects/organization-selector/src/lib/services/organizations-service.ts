import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { URLS } from '../organization.constants';
import { ApiResponse, NotificationService } from 'core';
import { OrganizationData } from '../models/organization-data';

@Service()
export class OrganizationsService {

  private notification_service = inject(NotificationService);
  private http = inject(HttpClient);

  constructor() { }

  fetch_organizations(filter: string): Observable<OrganizationData[]> {
    return this.http.post<ApiResponse>(URLS.fetch_organizations, {
      filter: filter
    }).pipe(
      map((r: ApiResponse) => {
        if (r.success && r.data) {
          const orgs = (r.data as {
            organizations: OrganizationData[]
          }).organizations;
          return orgs;
        }
        return Array<OrganizationData>();
      }),
      catchError((e: HttpErrorResponse) => {
        console.error(e.message);
        this.notification_service.error(e.message);

        throw e;
      })
    );
  }
}
