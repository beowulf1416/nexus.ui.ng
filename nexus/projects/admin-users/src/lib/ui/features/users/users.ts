import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';

import { ApiResponse } from 'core';
import { UsersService } from '../../../services/users-service';
import { UserDialog } from '../../../ui/dialogs/user-dialog/user-dialog';

@Component({
  selector: 'admin-users-list',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {

  constructor(
    private users_service: UsersService,
    private md: MatDialog
  ) {}

  ngOnInit(): void {

  }

  fetch_users(): void {
    this.users_service.fetch_users(
      '',
      10,
    ).subscribe({
      next: (r: ApiResponse) => {
        console.log(r);
      },
      error: (e: any) => {
        console.error(e);
      },
    });
  }

  on_new_user(event: Event): void {
    console.log('on_new_user');
    let dr = this.md.open(UserDialog, {
      position: {
        right: '10px'
      }
    })
    dr.afterClosed().subscribe((result: any) => {
      console.debug(result);
    });
  }
}
