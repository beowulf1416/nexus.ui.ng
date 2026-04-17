import { Component, computed } from '@angular/core';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-home',
  imports: [
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  user_name = computed(() => this.user_service.current_user().name);

  constructor(
    private user_service: UserService
  ) {
  }
}
