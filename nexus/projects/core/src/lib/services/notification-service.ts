import { Service } from '@angular/core';

@Service()
export class NotificationService {


  private _notifications = signal(new Array<Notification>())

  public notifications = computed(() => this._notifications());

  constructor() {}

  add_info(message: string): void {

  }
}
