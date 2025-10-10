import { Component, computed } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';

import { UserService } from '../../services/user-service';


@Component({
  selector: 'app-header',
  imports: [
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatToolbarModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  user_name = computed(() => this.user_service.current_user().name);

  constructor(
    private user_service: UserService
  ) {}
}
