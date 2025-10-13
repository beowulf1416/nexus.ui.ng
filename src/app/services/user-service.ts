import { Injectable, signal } from '@angular/core';

import { User } from '../classes/user';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../classes/api-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public readonly current_user = signal(User.anonymous());

  constructor(
    private http: HttpClient
  ) {}
}
