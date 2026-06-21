import { Component, OnInit, computed } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';

import { UserService } from '../../../services/user-service';
import { NotificationService } from '../../../services/notification-service';
import { NotificationsDialog } from '../../dialogs/notifications-dialog/notifications-dialog';


@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
  ],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css',
})
export class AppHeader implements OnInit {

  user = computed(() => this.user_service.current_user());
  is_user_authenticated = computed(() => {
    return this.user_service.current_user().is_authenticated
  });

  tenants = computed(() => this.user_service.tenants());

  constructor(
    private user_service: UserService,
    private notification_service: NotificationService,
    private route: ActivatedRoute,
    private md: MatDialog
  ) {}

  ngOnInit(): void {
    console.debug(this.route?.data);
  }

  on_notifications(event: Event): void {
    event.preventDefault();

    let dr = this.md.open(NotificationsDialog, {
      position: {
        top: '50px',
        right: '10px'
      }
    })
    dr.afterClosed().subscribe((result: any) => {
      console.debug(result);
    });
  }
}
