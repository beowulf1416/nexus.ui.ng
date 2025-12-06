import { Component, computed } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';

import { UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification-service';
import { MatBadgeModule } from '@angular/material/badge';
import { UiService } from '../../services/ui-service';
import { Router, RouterModule } from '@angular/router';
import { ApiResponse } from '../../classes/api-response';


@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatToolbarModule,
    MatBadgeModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  user = computed(() => this.user_service.current_user());
  tenant = computed(() => this.user_service.current_tenant());
  is_user_authenticated = computed(() => this.user_service.current_user().is_authenticated);
  note_count = computed(() => {
    const count = this.notifications_service.notifications().length;
    return count > 0 ? count : null;
  });


  constructor(
    private user_service: UserService,
    private notifications_service: NotificationService,
    private ui_service: UiService,
    private router: Router
  ) {}

  toggle_notifications() {
    console.info("//todo toggle_notifications()");
    this.notifications_service.toggle();
  }

  toggle_apps() {
    console.info("//todo toggle_apps()");
    this.ui_service.toggle_apps();
  }

  switch_tenant(tenant_id: string): void {
    console.info("switch_tenant", tenant_id);

    this.user_service.switch_tenant(tenant_id).subscribe({
      next: (r: ApiResponse) => {
        console.debug('//todo', r);
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
        console.info('//todo complete');
        this.router.navigateByUrl(this.router.url);
      }
    });
  }
}
