import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError } from 'rxjs';

import { ApiResponse, Uuid } from 'core';
import { URLS } from '../crm.constants';

// import { Person } from '../models/person';
// import { Business } from '../models/business';
import { Partner } from '../models/partner';
import { PartnerData } from '../models/partner-data';

@Service()
export class PartnerService {
  http = inject(HttpClient);

  constructor(
    // private http: HttpClient
  ) {}

  partner_save(tenant_id: Uuid, partner: Partner): Observable<ApiResponse> {
    console.info('partner_save');

    return this.http.post<ApiResponse>(URLS.partner_save, {
      tenant_id: tenant_id.to_string(),
      partner_id: partner.partner_id.to_string(),
      business_name: partner.business_name,
      description: partner.description,
      first_name: partner.first_name,
      middle_name: partner.middle_name,
      last_name: partner.last_name,
      prefix: partner.prefix,
      suffix: partner.suffix,
      // todo gender
      // gender: 0
    });
  }

  // business_save(
  //   tenant_id: Uuid,
  //   business: Business
  // ): Observable<ApiResponse> {
  //   return this.http.post<ApiResponse>(
  //     `${URLS.base_url}${URLS.business_save}`,
  //     {
  //       tenant_id: tenant_id.to_string(),
  //       business_id: business.business_id.to_string(),
  //       name: business.name,
  //       description: business.description,
  //     }
  //   );
  // }

  fetch_partners(filter: string): Observable<Array<PartnerData>> {
    return this.http
      .post<ApiResponse>(URLS.partners_fetch, {
        filter: filter,
      })
      .pipe(
        map((r: ApiResponse) => {
          if (r.success && r.data) {
            const partners = (
              r.data as {
                partners: Array<PartnerData>;
              }
            ).partners;
            return partners;
          }
          return new Array<PartnerData>();
        }),
        catchError((e: any) => {
          console.error(e);
          // return of(new Array<Partner>());
          throw e;
        }),
      );
  }

  fetch_partner(partner_id: Uuid): Observable<PartnerData | null> {
    return this.http.post<ApiResponse>(URLS.partner_fetch, {
      partner_id: partner_id.to_string()
    }).pipe(
      map((r: ApiResponse) => {
        if (r.success && r.data) {
          const pd = (r.data as {
            partner: PartnerData
          }).partner;
          return pd;
        }
        return null;
      }),
      catchError((e: any) => {
        console.error(e);
        throw e;
      })
    );
  }

  partner_set_active(partner_ids: Array<Uuid>, active: boolean): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(URLS.partners_set_active, {
      partner_ids: partner_ids,
      active: active,
    });
  }
}
