import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-success',
  imports: [],
  templateUrl: './sign-up-success.html',
  styleUrl: './sign-up-success.css'
})
export class SignUpSuccess implements OnInit {

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/auth/sign-in']);
    }, 5000);
  }
}
