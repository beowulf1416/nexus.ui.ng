import { Component, computed } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Header } from '../header/header';

@Component({
  selector: 'app-home',
  imports: [
    Header
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  user_name = computed(() => this.user_service.current_user().name);;

  constructor(
    private user_service: UserService
  ) {
  }
}
