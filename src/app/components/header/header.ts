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


@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
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
  note_count = computed(() => this.notifications_service.notifications().length)


  constructor(
    private user_service: UserService,
    private notifications_service: NotificationService,
    private ui_service: UiService
  ) {}

  toggle_notifications() {
    console.info("//todo toggle_notifications()");
    this.notifications_service.toggle();
  }

  toggle_apps() {
    console.info("//todo toggle_apps()");
    this.ui_service.toggle_apps();
  }
}
