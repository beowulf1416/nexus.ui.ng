import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

import { ApiResponse, NotificationService, Uuid } from 'core';
import { URLS } from '../tenant-admin.constants';
import { OrganizationNodeData } from '../models/organization-node-data';
import { OrganizationData } from '../models/organization-data';

@Service()
export class OrganizationsService {

  private http = inject(HttpClient);
  private notification_service = inject(NotificationService);

  constructor() { }

  organization_save(
    org_id: Uuid,
    parent_org_id: Uuid,
    name: string,
    description: string,
    version: number
  ): Observable<ApiResponse> {
    console.info('organization_save');

    return this.http.post<ApiResponse>(
      URLS.organization_save,
      {
        org_id: org_id.to_string(),
        parent_org_id: parent_org_id.to_string(),
        name: name,
        description: description,
        version: version
      }
    )
  }

  organizations_fetch(
  ): Observable<OrganizationData[]> {
    console.info('organizations_fetch');

    return this.http.post<ApiResponse>(URLS.organizations_fetch, {}).pipe(
      map((r: ApiResponse) => {
        if(r.success && r.data) {
          const orgs = (r.data as {
            organizations: OrganizationData[]
          }).organizations;

          return orgs;
        }
        return new Array<OrganizationNodeData>();
      }),
      catchError((e: any) => {
        console.error(e);
        this.notification_service.error(e);
        throw e;
      }),
    );
  }



    organizations_fetch_tree(
    ): Observable<OrganizationNodeData[]> {
      console.info('organizations_fetch_tree');

      return this.http.post<ApiResponse>(URLS.organizations_fetch_tree, {}).pipe(
        map((r: ApiResponse) => {
          if(r.success && r.data) {
            const orgs = (r.data as {
              organizations: OrganizationNodeData[]
            }).organizations;

            return orgs;
          }
          return new Array<OrganizationNodeData>();
        }),
        catchError((e: any) => {
          console.error(e);
          this.notification_service.error(e);
          throw e;
        }),
      );
    }
}
