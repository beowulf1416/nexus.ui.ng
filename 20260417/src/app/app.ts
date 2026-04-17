import { Component, computed, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Main } from './components/main/main';
import { NotificationService } from './services/notification-service';
import { UiService } from './services/ui-service';
import { UserService } from './services/user-service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    Main
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'nexus.ui';

  show_nav_start = computed(() => {
    return this.ui_service.show_apps();
  });

  show_nav_end = computed(() => {
    return this.notifications_service.show_notes();
  });

  constructor(
    private notifications_service: NotificationService,
    private ui_service: UiService,
    private us: UserService
  ) {}

  ngOnInit(): void {
    this.us.reload();
  }
}
