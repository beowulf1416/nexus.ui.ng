import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-sign-out',
  imports: [
    RouterLink,
  ],
  templateUrl: './sign-out.html',
  styleUrl: './sign-out.css',
})
export class SignOut implements OnInit
{

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.sign_out().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
