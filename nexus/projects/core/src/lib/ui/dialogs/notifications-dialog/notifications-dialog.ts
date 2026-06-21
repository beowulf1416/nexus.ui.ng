import { Component, computed } from '@angular/core';

import { NotificationService } from '../../../services/notification-service';


@Component({
  selector: 'lib-notifications-dialog',
  imports: [],
  templateUrl: './notifications-dialog.html',
  styleUrl: './notifications-dialog.css',
})
export class NotificationsDialog {

  notifications = computed(() => this.notification_service.notifications());

  constructor(
    private notification_service: NotificationService
  ) {}
}
