import { Injectable, signal } from '@angular/core';

import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public readonly current_user = signal(User.anonymous());

  constructor(
  ) {}
}
