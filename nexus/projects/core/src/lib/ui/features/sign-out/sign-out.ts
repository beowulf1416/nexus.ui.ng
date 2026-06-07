import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'sign-out',
  imports: [
    RouterLink
  ],
  templateUrl: './sign-out.html',
  styleUrl: './sign-out.css',
})
export class SignOut implements OnInit {

  constructor(private user_service: UserService) {}

  ngOnInit(): void {
    this.user_service.sign_out().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
