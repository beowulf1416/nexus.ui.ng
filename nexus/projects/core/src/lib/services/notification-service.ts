import { Service, Signal, signal } from '@angular/core';


export class Notification {
  constructor(
    readonly type: 'info' | 'error',
    readonly message: string,
  ) {}
}

@Service()
export class NotificationService {
  private _notifications = signal(new Array<Notification>())

  constructor() {}

  get notifications(): Signal<Array<Notification>> {
    return this._notifications.asReadonly();
  }

  info(message: string): void {
    console.info(message);
    this._notifications.update((notifications) => {
      return notifications.concat(new Notification('info', message));
    });
  }

  error(message: string): void {
    console.error(message);
    this._notifications.update((notifications) => {
      return notifications.concat(new Notification('error', message));
    });
  }
}
