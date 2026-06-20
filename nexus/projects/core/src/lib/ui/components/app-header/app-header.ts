import { Component, OnInit, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UserService } from '../../../services/user-service';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.debug(this.route?.data);
  }
}
