import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user-service';

@Component({
  selector: 'app-sign-out',
  imports: [],
  templateUrl: './sign-out.html',
  styleUrl: './sign-out.css',
})
export class SignOut implements OnInit {

  constructor(
    private router: Router,
    private us: UserService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.us.sign_out();
      this.router.navigate(['/auth/sign-in']);
    }, 3000);
  }
}
