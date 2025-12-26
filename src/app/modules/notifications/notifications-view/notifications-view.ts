import { Component, computed } from '@angular/core';
import { NotificationService } from '../../../services/notification-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications-view',
  imports: [
    CommonModule
  ],
  templateUrl: './notifications-view.html',
  styleUrl: './notifications-view.css',
})
export class NotificationsView {

  notes = computed(() => {
    return this.ns.notifications()
  });

  public constructor(
    private ns: NotificationService
  ) {}
}
