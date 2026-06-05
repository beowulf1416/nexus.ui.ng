import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from 'auth';
import { ApiResponse } from 'common'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('nexus');

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.fetch_current_user().subscribe({
      next: (r: ApiResponse) => {
        console.log(r);
      },
      error: (e: any) => {
        console.error(e);
      }
    });
  }


}
