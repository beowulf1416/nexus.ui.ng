import { Component, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UserService } from '../../../services/user-service';

@Component({
  selector: 'header',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  user = computed(() => this.user_service.current_user());
  is_user_authenticated = computed(() => {
    return this.user_service.current_user().is_authenticated
  });

  tenants = computed(() => this.user_service.tenants());

  constructor(
    private user_service: UserService,
  ) {

  }
}
