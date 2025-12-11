import { Component, computed } from '@angular/core';
import { NotificationService } from '../../services/notification-service';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-notifications',
  imports: [
    // JsonPipe
  ],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css'
})
export class Notifications {

  notes = computed(() => this.ns.notifications());

  constructor(
    private ns: NotificationService
  ) {}
}
