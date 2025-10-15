import { Component, computed } from '@angular/core';
import { NotificationService } from '../../services/notification-service';

@Component({
  selector: 'app-notifications',
  imports: [],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css'
})
export class Notifications {

  notes = computed(() => this.notification_service.notifications());

  constructor(
    private notification_service: NotificationService
  ) {}
}
