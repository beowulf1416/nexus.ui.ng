import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiResponse } from '../../../models/api-response';
import { Uuid } from '../../../models/uuid';
import { UserService } from '../../../services/user-service';


@Component({
  selector: 'lib-tenant-select',
  imports: [],
  templateUrl: './tenant-select.html',
  styleUrl: './tenant-select.css',
})
export class TenantSelect implements OnInit {

  private user_service = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);


  constructor() {
    const tenant_id = this.route.snapshot.paramMap.get('tenant_id');
    const dest = this.route.snapshot.queryParams.get('dest');

    if (tenant_id) {
      this.user_service.switch_tenant(
        new Uuid(tenant_id)
      ).subscribe({
        next: (r: ApiResponse) => {
          console.debug(r);
          if (r.success) {
            setTimeout(() => {
              this.router.navigate([dest])
            }, 3000);
          }
        },
        error: (e: Error) => {
          console.error(e);
        }
      })
    }
  }

  ngOnInit(): void {
    // const tenant_id = this.route.snapshot.paramMap.get('tenant_id');
    // console.debug('ngOnInit', tenant_id);
    // if (tenant_id) {
    //   this.user_service.switch_tenant(
    //     new Uuid(tenant_id)
    //   ).subscribe({
    //     next: (r: ApiResponse) => {
    //       console.debug(r);
    //     },
    //     error: (e: Error) => {
    //       console.error(e);
    //     }
    //   })
    // }
  }
}
