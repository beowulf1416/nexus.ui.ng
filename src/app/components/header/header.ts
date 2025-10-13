import { Component, computed } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';

import { UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatToolbarModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  user = computed(() => this.user_service.current_user());

  constructor(
    private user_service: UserService
  ) {}
}
